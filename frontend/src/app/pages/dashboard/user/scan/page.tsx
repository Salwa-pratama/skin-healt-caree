"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePredictMutation } from "@/features/scan/api/scan.api";
import { useSaveHistoryMutation } from "@/features/history/api/history.api";
import { useProfile } from "@/features/auth/api/profile.api";
import { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";

import MobileNav from "@/app/components/MobileNav";
import "./scan.css";


const isSkinImage = (img: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement): boolean => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return true; // Fallback to true if context fails

  canvas.width = 100;
  canvas.height = 100;
  ctx.drawImage(img, 0, 0, 100, 100);

  const imageData = ctx.getImageData(0, 0, 100, 100);
  const data = imageData.data;

  let skinPixelCount = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // YCbCr color space conversion
    const y = 0.299 * r + 0.587 * g + 0.114 * b;
    const cb = 128 - 0.168736 * r - 0.331264 * g + 0.5 * b;
    const cr = 128 + 0.5 * r - 0.418688 * g - 0.081312 * b;

    // Skin color range in YCbCr
    if (y > 80 && cb > 85 && cb < 135 && cr > 135 && cr < 180) {
      skinPixelCount++;
    }
  }

  const totalPixels = 100 * 100;
  const skinPercentage = skinPixelCount / totalPixels;

  // Return true if at least 15% of the image has skin color
  return skinPercentage > 0.15;
};

export default function Analisis() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"live" | "upload">("live");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictionResult, setPredictionResult] = useState<{
    jerawat: string;
    predictions: { label: string; persentase: string }[];
    rekomendasi: {
      type: string;
      description: string;
      goodIngredients: string[];
      badIngredients: string[];
      habits: string[];
      treatments: { name: string; time: string }[];
    };
  } | null>(null);
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info";
    showDontRemindOption?: boolean;
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const { data: profile } = useProfile();
  const activeSub = profile?.userSubscriptions?.[0];
  const maxScansPerMonth = activeSub?.plan?.maxScansPerMonth ?? '∞';
  const currentScans = activeSub?.currentMonthScans ?? 0;
  const isLimitReached = typeof maxScansPerMonth === 'number' && currentScans >= maxScansPerMonth;

  const showModal = (title: string, message: string, type: "success" | "error" | "info" = "info", showDontRemindOption: boolean = false) => {
    setModalConfig({ isOpen: true, title, message, type, showDontRemindOption });
  };
  const predictMutation = usePredictMutation();
  const saveHistoryMutation = useSaveHistoryMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const latestFaceLandmarksRef = useRef<any>(null);

  // Initialize Face Landmarker
  useEffect(() => {
    const initFaceDetection = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.34/wasm"
        );
        const landmarker = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU"
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1
        });
        setFaceLandmarker(landmarker);
      } catch (err) {
        console.error("Gagal inisialisasi Face Landmarker:", err);
      }
    };
    initFaceDetection();
  }, []);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (activeTab === "live" && isCameraActive) {
        try {
          const s = await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "user",
              width: { ideal: 1280 },
              height: { ideal: 720 }
            }
          });
          stream = s;

          // Small delay to ensure the video element is mounted and ref is populated
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.srcObject = s;
              videoRef.current.onloadedmetadata = () => {
                videoRef.current?.play().catch(console.error);
              };
            }
          }, 150);
        } catch (err) {
          console.warn("Kamera tidak diizinkan atau tidak tersedia:", err);
          const hideCameraAlert = localStorage.getItem("hideCameraAlert");
          if (!hideCameraAlert) {
            showModal("Akses Kamera", "Gagal mengakses kamera. Pastikan izin kamera telah diberikan.", "error", true);
          }
        }
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeTab, isCameraActive]);

  // Detection Loop
  useEffect(() => {
    let requestRef: number;

    const predictWebcam = () => {
      if (faceLandmarker && videoRef.current && videoRef.current.readyState >= 2 && activeTab === "live") {
        const startTimeMs = performance.now();
        const results = faceLandmarker.detectForVideo(videoRef.current, startTimeMs);

        const canvasCtx = canvasRef.current?.getContext("2d");
        if (canvasCtx && canvasRef.current && videoRef.current) {
          // Sync canvas size with video size for accurate coordinate mapping
          canvasRef.current.width = videoRef.current.videoWidth;
          canvasRef.current.height = videoRef.current.videoHeight;

          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

          if (results.faceLandmarks && results.faceLandmarks.length > 0) {
            setFaceDetected(true);
            latestFaceLandmarksRef.current = results.faceLandmarks[0];
            const drawingUtils = new DrawingUtils(canvasCtx);
            for (const landmarks of results.faceLandmarks) {
              // Draw detailed mesh
              drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: "#C0C0C050", lineWidth: 1 });

              // Draw major features with thicker lines for full facial coverage
              const mainFeatureStyle = { color: "#84f75e", lineWidth: 3 };
              drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, mainFeatureStyle);
              drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, mainFeatureStyle);
              drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, mainFeatureStyle);
              drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, mainFeatureStyle);
              drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LIPS, mainFeatureStyle);
              drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: "#84f75e", lineWidth: 4 });
            }
          } else {
            setFaceDetected(false);
            latestFaceLandmarksRef.current = null;
          }
          canvasCtx.restore();
        }
      }
      requestRef = requestAnimationFrame(predictWebcam);
    };

    predictWebcam();
    return () => cancelAnimationFrame(requestRef);
  }, [faceLandmarker, activeTab]);

  const captureImage = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      let cropX = 0;
      let cropY = 0;
      let cropW = videoWidth;
      let cropH = videoHeight;

      if (latestFaceLandmarksRef.current) {
        const landmarks = latestFaceLandmarksRef.current;
        let minX = 1, minY = 1, maxX = 0, maxY = 0;
        for (const pt of landmarks) {
          minX = Math.min(minX, pt.x);
          maxX = Math.max(maxX, pt.x);
          minY = Math.min(minY, pt.y);
          maxY = Math.max(maxY, pt.y);
        }

        const paddingX = (maxX - minX) * 0.2;
        const paddingY = (maxY - minY) * 0.25;

        const finalMinX = Math.max(0, minX - paddingX);
        const finalMaxX = Math.min(1, maxX + paddingX);
        const finalMinY = Math.max(0, minY - paddingY - 0.1);
        const finalMaxY = Math.min(1, maxY + paddingY);

        cropX = finalMinX * videoWidth;
        cropY = finalMinY * videoHeight;
        cropW = (finalMaxX - finalMinX) * videoWidth;
        cropH = (finalMaxY - finalMinY) * videoHeight;
      }

      const captureCanvas = document.createElement("canvas");
      captureCanvas.width = cropW;
      captureCanvas.height = cropH;
      const ctx = captureCanvas.getContext("2d");

      if (ctx) {
        ctx.drawImage(video, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

        const imageData = captureCanvas.toDataURL("image/jpeg");
        setCapturedImage(imageData);
        setIsCameraActive(false);

        captureCanvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
            setCapturedFile(file);
          }
        }, "image/jpeg");
      }
    }
  };

  const handleLivePredict = async () => {
    if (capturedFile && capturedImage) {
      if (!faceDetected) {
        const img = new Image();
        img.src = capturedImage;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        if (!isSkinImage(img)) {
          showModal("Gambar Anomali", "Kamera tidak mendeteksi wajah atau kulit yang jelas. Silakan posisikan ulang kamera Anda.", "error");
          resetScan();
          return;
        }
      }

      setIsAnalyzing(true);
      const startTime = Date.now();
      predictMutation.mutate(capturedFile, {
        onSuccess: (resData: any) => {
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(0, 10000 - elapsed);
          setTimeout(() => {
            if (resData?.data) {
              setPredictionResult(resData.data);
            }
            setIsAnalyzing(false);
          }, remainingTime);
        },
        onError: (err: any) => {
          console.error("Live Analysis Error:", err);
          showModal("Analisis Gagal", "Gagal melakukan analisis kulit. Pastikan koneksi server tersedia.", "error");
          setIsAnalyzing(false);
        }
      });
    }
  };

  const resetScan = () => {
    setIsCameraActive(true);
    setCapturedImage(null);
    setCapturedFile(null);
    setPredictionResult(null);
    setSelectedFile(null);
    setShowDetail(false);
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPredictionResult(null); // Reset hasil prediksi setiap ganti file baru

      // Convert to base64 for history saving
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedFile && faceLandmarker) {
      setIsValidating(true);
      console.log("Validating photo for face presence...");

      // Create image element for validation
      const img = document.createElement("img");
      const imageUrl = URL.createObjectURL(selectedFile);
      img.src = imageUrl;

      try {
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        // Use the existing landmarker to detect face in the uploaded image
        const results = faceLandmarker.detectForVideo(img, performance.now());

        if (!results.faceLandmarks || results.faceLandmarks.length === 0) {
          console.log("Wajah utuh tidak terdeteksi, mencoba memvalidasi area kulit...");
          if (!isSkinImage(img)) {
            showModal("Gambar Anomali", "Foto tidak terdeteksi sebagai wajah atau kulit yang jelas. Silakan unggah foto kulit/wajah yang sesuai.", "error");
            setSelectedFile(null);
            setIsValidating(false);
            URL.revokeObjectURL(imageUrl);
            return;
          }
        }

        console.log("Starting Upload Analysis for:", selectedFile.name);
        setIsAnalyzing(true);
        const startTime = Date.now();
        predictMutation.mutate(selectedFile, {
          onSuccess: (resData: any) => {
            console.log("Upload Prediction Success:", resData);
            const elapsed = Date.now() - startTime;
            const remainingTime = Math.max(0, 3000 - elapsed);
            setTimeout(() => {
              if (resData?.data) {
                setPredictionResult(resData.data);
                showModal("Analisis Berhasil", "Data analisis kulit telah berhasil diproses.", "success");
              } else {
                showModal("Kesalahan Data", "Data tidak valid dari server.", "error");
              }
              setIsValidating(false);
              setIsAnalyzing(false);
            }, remainingTime);
          },
          onError: (err: any) => {
            console.error("Upload Analysis Error:", err);
            const errorMsg = err.response?.data?.message || "Gagal melakukan analisis kulit.";
            showModal("Analisis Gagal", errorMsg, "error");
            setIsValidating(false);
            setIsAnalyzing(false);
          }
        });
      } catch (err) {
        console.error("Validation error:", err);
        showModal("Kesalahan Proses", "Gagal memproses gambar. Pastikan file adalah gambar yang valid.", "error");
        setIsValidating(false);
        setIsAnalyzing(false);
      } finally {
        URL.revokeObjectURL(imageUrl);
      }
    }
  };

  return (
    <div >

      <MobileNav activePage="scan" />

      {/* Main Content Area - Fixed Sidebar Overlap */}

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="label-small uppercase tracking-[0.2em] text-primary font-extrabold text-[10px] md:text-xs">
              Ringkasan Analisis Pasien
            </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-on-background mt-2 tracking-tight">
              {predictionResult ? (
                "Hasil Analisis"
              ) : (
                <>Aliran <span className="text-primary">Diagnostik</span></>
              )}
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Limit Badge */}
            <div className="flex items-center gap-2 bg-[var(--dashboard-card-bg)] px-4 py-2.5 rounded-full border border-[var(--dashboard-border)] shadow-sm">
              <span className="material-symbols-outlined text-primary text-sm">radar</span>
              <span className="text-[10px] sm:text-xs font-bold text-on-surface-variant tracking-wider uppercase">
                Penggunaan Scan: <span className={`ml-1 font-black ${isLimitReached ? 'text-red-500' : 'text-[var(--dashboard-text)]'}`}>{currentScans}</span> / {maxScansPerMonth > 1000 ? 'Unlimited' : maxScansPerMonth}
              </span>
            </div>

            {/* Mode Segmented Control */}
            {!predictionResult && (
              <div className="bg-surface-container-high p-0.5 rounded-xl flex w-fit">
              <button
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${activeTab === "live"
                  ? "tab-active"
                  : "text-on-surface/50 hover:text-on-surface"
                  }`}
                onClick={() => setActiveTab("live")}
              >
                <span className="material-symbols-outlined text-[16px]">
                  videocam
                </span>
                Scan Langsung
              </button>
              <button
                className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${activeTab === "upload"
                  ? "tab-active"
                  : "text-on-surface/50 hover:text-on-surface"
                  }`}
                onClick={() => setActiveTab("upload")}
              >
                <span className="material-symbols-outlined text-[16px]">
                  cloud_upload
                </span>
                Unggah Foto
              </button>
            </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Left Column: Skin Analysis Content */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 md:gap-8">
            {/* Main Container */}
            <div className="bg-[var(--dashboard-card-bg)] rounded-lg overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative min-h-[500px] flex flex-col border border-[var(--dashboard-border)]">
              {activeTab === "live" && (
                <div className="relative flex-grow block bg-black min-h-[450px]">
                  {isCameraActive ? (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-[450px] object-cover opacity-90"
                      />
                      <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-[450px] object-cover pointer-events-none"
                        width={640}
                        height={480}
                      />

                      {/* HUD Overlays */}
                      <div className="absolute inset-0 flex flex-col pointer-events-none">
                        <div className="scanning-line absolute w-full top-0 z-10 opacity-40"></div>
                        {/* Tracking Status */}
                        <div className="absolute top-6 left-6 flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${faceDetected ? 'bg-primary status-pulse' : 'bg-red-500'}`}></div>
                          <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                              {faceDetected ? 'Sistem: Wajah Terdeteksi' : 'Sistem: Mencari Wajah / Kulit...'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Capture Button Overlay */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
                        <div className="flex flex-col items-center gap-4">
                          {!faceDetected && (
                            <div className="bg-red-500/80 backdrop-blur-md px-4 py-1.5 rounded-full animate-bounce">
                              <p className="text-[10px] font-bold text-white uppercase tracking-widest">Posisikan Wajah / Kulit</p>
                            </div>
                          )}
                          <button
                            onClick={() => {
                              if (isLimitReached) {
                                showModal("Limit Tercapai", `Batas maksimal scan bulanan Anda (${maxScansPerMonth}) telah habis. Silakan upgrade paket berlangganan.`, "error");
                                return;
                              }
                              captureImage();
                            }}
                            disabled={isAnalyzing || isLimitReached}
                            className={`w-16 h-16 rounded-full border-4 ${isLimitReached ? 'border-gray-500' : 'border-white'} flex items-center justify-center group active:scale-90 transition-all ${isLimitReached ? 'cursor-not-allowed opacity-50' : ''}`}
                          >
                            <div className={`w-12 h-12 rounded-full ${isLimitReached ? 'bg-gray-600' : isAnalyzing ? 'bg-slate-400' : 'bg-primary'} group-hover:scale-110 transition-transform flex items-center justify-center`}>
                              <span className="material-symbols-outlined text-white">
                                {isAnalyzing ? 'sync' : 'camera'}
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="relative w-full h-[450px] flex flex-col items-center justify-center">
                      {capturedImage && (
                        <img
                          src={capturedImage}
                          alt="Captured"
                          className="absolute inset-0 w-full h-full object-contain bg-black"
                        />
                      )}
                      {!predictionResult && <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>}

                      {isAnalyzing ? (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                          <div className="w-16 h-16 border-[5px] border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(28,109,0,0.5)]"></div>
                          <p className="text-primary font-black text-xs uppercase tracking-[0.3em] mt-6 animate-pulse drop-shadow-[0_0_5px_rgba(28,109,0,0.5)]">Sedang Proses Prediksi...</p>
                        </div>
                      ) : (
                        <>
                          {!predictionResult ? (
                            <div className="absolute bottom-6 right-6 flex gap-3 pointer-events-auto z-20">
                              <button
                                onClick={resetScan}
                                className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-2xl font-bold hover:bg-white/30 transition-all flex items-center gap-2"
                              >
                                <span className="material-symbols-outlined text-sm">refresh</span>
                                Ulang
                              </button>
                              <button
                                onClick={handleLivePredict}
                                className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover:bg-[#1c6d00] transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
                              >
                                <span className="material-symbols-outlined text-sm">analytics</span>
                                Analisis
                              </button>
                            </div>
                          ) : null}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Upload View */}
              {activeTab === "upload" && (
                <div className="relative flex-grow bg-[var(--dashboard-bg)] flex flex-col items-center justify-center p-12 min-h-[400px]">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileChange}
                    accept="image/jpeg, image/png"
                  />
                  {!selectedFile ? (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full max-w-md aspect-video glass-panel rounded-3xl border-2 border-dashed border-primary/30 flex flex-col items-center justify-center p-8 cursor-pointer group hover:border-primary/60 transition-all"
                    >
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                        <span className="material-symbols-outlined text-4xl text-primary">
                          add_a_photo
                        </span>
                      </div>
                      <h3 className="text-xl font-extrabold text-[var(--dashboard-text)] mb-2">
                        Unggah Foto Pasien
                      </h3>
                      <p className="text-sm text-[var(--dashboard-text-secondary)] text-center font-medium">
                        Tarik dan lepas file di sini atau{" "}
                        <span className="text-primary font-bold">
                          cari file
                        </span>{" "}
                        untuk memulai analisis.
                      </p>
                      <div className="mt-8 flex gap-3 text-[10px] font-black uppercase tracking-widest text-[var(--dashboard-text-secondary)]/60">
                        <span>JPG</span>
                        <span className="w-1 h-1 bg-[var(--dashboard-border)] rounded-full self-center"></span>
                        <span>PNG</span>
                        <span className="w-1 h-1 bg-[var(--dashboard-border)] rounded-full self-center"></span>
                        <span>Maks 10MB</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full max-w-md glass-panel rounded-3xl border-2 border-primary/60 p-8 flex flex-col items-center shadow-lg overflow-hidden">
                      {isAnalyzing && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--dashboard-card-bg)]/80 backdrop-blur-sm">
                          <div className="w-16 h-16 border-[5px] border-primary border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(28,109,0,0.5)]"></div>
                          <p className="text-primary font-black text-xs uppercase tracking-[0.3em] mt-6 animate-pulse drop-shadow-[0_0_5px_rgba(28,109,0,0.2)]">Sedang Proses Prediksi...</p>
                        </div>
                      )}
                      <div className="w-full max-h-64 bg-[var(--dashboard-bg)] rounded-xl mb-6 overflow-hidden flex justify-center">
                        <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="h-full object-cover" />
                      </div>
                      {!predictionResult && <p className="text-sm font-bold text-[var(--dashboard-text-secondary)] truncate w-full text-center mb-6">{selectedFile.name}</p>}
                      {!predictionResult && (
                        <div className="flex gap-4 w-full">
                          <button onClick={() => setSelectedFile(null)} className="flex-1 py-3 bg-[var(--dashboard-bg)] text-[var(--dashboard-text)] rounded-xl font-bold hover:bg-[var(--dashboard-border)] transition-colors">
                            Batal
                          </button>
                          <button
                            onClick={() => {
                              if (isLimitReached) {
                                showModal("Limit Tercapai", `Batas maksimal scan bulanan Anda (${maxScansPerMonth}) telah habis. Silakan upgrade paket berlangganan.`, "error");
                                return;
                              }
                              handleSubmit();
                            }}
                            disabled={isAnalyzing || isValidating || isLimitReached}
                            className={`flex-1 py-3 bg-primary text-white rounded-xl font-bold transition-colors disabled:opacity-50 ${isLimitReached ? 'bg-gray-500 hover:bg-gray-500 cursor-not-allowed' : 'hover:bg-[#1c6d00]'}`}
                          >
                            {isValidating ? "Validasi..." : isAnalyzing ? "Sedang Proses Prediksi..." : "Proses Analisis"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Removed result div to show uploaded photo preview clearly */}

                  <p className="mt-8 text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-[0.2em] flex items-center gap-2">
                    <span className="material-symbols-outlined text-xs">
                      verified_user
                    </span>
                    Data terenkripsi dan aman
                  </p>
                </div>
              )}

              {/* Footer HUD */}
              <div className="p-8 bg-[var(--dashboard-card-bg)] flex justify-between items-end border-t border-[var(--dashboard-border)]">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary status-pulse"></span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/50">
                      Fase Bio-Analisis
                    </span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-[var(--dashboard-text)]">
                    PETA_EPIDERMAL_V2
                  </h3>
                </div>
                <div className="flex flex-col items-end gap-3">
                  <div className="flex gap-1.5 h-6 items-end">
                    <span className="w-1.5 h-3 bg-primary/30 rounded-full"></span>
                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                    <span className="w-1.5 h-4 bg-primary/60 rounded-full"></span>
                    <span className="w-1.5 h-5 bg-primary rounded-full"></span>
                  </div>
                  <div className="text-[10px] font-mono font-bold text-on-surface/40 uppercase">
                    INDEKS_LUM: 0.884
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[var(--dashboard-card-bg)] rounded-lg p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/30">
                    Profil Komposisi
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] p-3 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-[var(--dashboard-text-secondary)] mb-2">
                      Kering
                    </p>
                    <div className="h-1 bg-[var(--dashboard-border)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/60"
                        style={{ width: "33%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-primary/10 border border-primary/20 p-3 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-primary mb-2">
                      Berjerawat
                    </p>
                    <div className="h-1 bg-[var(--dashboard-border)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: "88%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="bg-[var(--dashboard-bg)] border border-[var(--dashboard-border)] p-3 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-[var(--dashboard-text-secondary)] mb-2">
                      Berminyak
                    </p>
                    <div className="h-1 bg-[var(--dashboard-border)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary/60"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[var(--dashboard-card-bg)] rounded-lg p-6 flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-text-secondary)]/50 mb-2">
                    Tingkat Hidrasi
                  </p>
                  <p className="text-4xl font-black text-[var(--dashboard-text)]">
                    84<span className="text-primary text-xl ml-1">%</span>
                  </p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform cursor-pointer">
                  <span className="material-symbols-outlined text-3xl font-black">
                    water_drop
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sidebar Analysis */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-6 md:gap-8">

            {/* Concerns List */}
            <div className="bg-[var(--dashboard-card-bg)] rounded-lg p-6 md:p-8 flex flex-col h-[520px]">
              <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-8">
                {/* Masalah Terdeteksi Section */}
                <section>
                  <h3 className="font-extrabold text-xs md:text-sm uppercase tracking-widest mb-6">
                    Masalah Terdeteksi
                  </h3>
                  <div className="space-y-3">
                    {(predictionResult ? predictionResult.predictions : [
                      { label: "Pustules", persentase: "0%" },
                      { label: "Papules", persentase: "0%" },
                      { label: "Cyst", persentase: "0%" },
                      { label: "Blackhead", persentase: "0%" },
                      { label: "Whitehead", persentase: "0%" },
                    ]).map((pred, index) => (
                      <div key={index} className="group">
                        <div className="flex justify-between items-center mb-1.5 px-1">
                          <span className="text-[10px] font-bold text-[var(--dashboard-text-secondary)] uppercase tracking-widest">
                            {pred.label}
                          </span>
                          <span className="text-[10px] font-black text-primary">
                            {pred.persentase}
                          </span>
                        </div>
                        <div className="w-full bg-[var(--dashboard-bg)] h-1.5 rounded-full overflow-hidden border border-[var(--dashboard-border)]">
                          <div
                            className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(28,109,0,0.3)]"
                            style={{ width: pred.persentase }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Rekomendasi Section */}
                {predictionResult && (
                  <section className="space-y-4 pt-4 animate-in fade-in slide-in-from-top-4 duration-700 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="h-px bg-[var(--dashboard-border)] flex-grow"></div>
                      <span className="text-[9px] font-black text-[var(--dashboard-text-secondary)]/50 uppercase tracking-[0.3em]">Rekomendasi Ahli</span>
                      <div className="h-px bg-[var(--dashboard-border)] flex-grow"></div>
                    </div>

                    {/* Analysis Summary Card */}
                    <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-2xl p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary text-sm">verified</span>
                        <h3 className="font-extrabold text-[10px] uppercase tracking-widest text-[var(--dashboard-text)]">
                          Analisis {predictionResult.rekomendasi.type}
                        </h3>
                      </div>
                      <p className="text-[11px] text-[var(--dashboard-text-secondary)] font-bold leading-relaxed">
                        {predictionResult.rekomendasi.description}
                      </p>
                    </div>

                    {/* Ingredients Card */}
                    <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-2xl p-4 shadow-sm space-y-4">
                      <div>
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-text-secondary)] mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Kandungan Disarankan
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {predictionResult.rekomendasi.goodIngredients.map((item, i) => (
                            <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-[9px] font-bold rounded-lg border border-primary/20">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="pt-3 border-t border-[var(--dashboard-border)]">
                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-text-secondary)] mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          Hindari Kandungan
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {predictionResult.rekomendasi.badIngredients.map((item, i) => (
                            <span key={i} className="px-2 py-1 bg-red-500/10 text-red-500 text-[9px] font-bold rounded-lg border border-red-500/20">
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Habits & Lifestyle Card */}
                    <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-2xl p-4 shadow-sm">
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-text-secondary)] mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">self_care</span>
                        Kebiasaan Sehat
                      </h4>
                      <ul className="space-y-2">
                        {predictionResult.rekomendasi.habits.map((item, i) => (
                          <li key={i} className="text-[10px] font-bold text-[var(--dashboard-text)] flex items-start gap-2">
                            <span className="mt-1 w-1 h-1 bg-primary rounded-full flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Treatment Plan Card */}
                    <div className="bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-2xl p-4 shadow-sm">
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--dashboard-text-secondary)] mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">medical_services</span>
                        Rencana Perawatan
                      </h4>
                      <div className="space-y-2">
                        {predictionResult.rekomendasi.treatments.map((item, i) => (
                          <div key={i} className="bg-[var(--dashboard-bg)] p-3 rounded-xl flex justify-between items-center group hover:bg-primary/5 transition-colors duration-300 border border-[var(--dashboard-border)]">
                            <p className="text-[10px] font-black text-[var(--dashboard-text)] group-hover:text-primary transition-colors">{item.name}</p>
                            <div className="flex items-center gap-1 px-2 py-1 bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] shadow-sm rounded-full">
                              <span className="material-symbols-outlined text-[10px] text-primary">schedule</span>
                              <p className="text-[8px] font-black text-[var(--dashboard-text-secondary)] uppercase tracking-tighter">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

              </div>
            </div>


            {/* Final CTA */}
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={() => {
                  const activeFile = activeTab === "upload" ? selectedFile : capturedFile;
                  if (predictionResult && activeFile) {
                    saveHistoryMutation.mutate({
                      file: activeFile,
                      jerawat: predictionResult.jerawat,
                      predictions: predictionResult.predictions
                    }, {
                      onSuccess: () => {
                        showModal("Berhasil Disimpan", "Hasil analisis kulit Anda telah berhasil disimpan ke history.", "success");
                        resetScan();
                      },
                      onError: (error: any) => {
                        console.error("Save History Error:", error);
                        const errorMsg = error.response?.data?.message || error.message || "Maaf, terjadi kesalahan saat mencoba menyimpan hasil analisis.";
                        showModal("Gagal Menyimpan", errorMsg, "error");
                      }
                    });
                  }
                }}
                disabled={!predictionResult || !(activeTab === "upload" ? selectedFile : capturedFile) || saveHistoryMutation.isPending}
                className={`w-full py-4 rounded-2xl font-black text-base tracking-tight shadow-lg transition-all flex items-center justify-center gap-3 ${predictionResult
                  ? "signature-gradient text-white hover:-translate-y-1 active:scale-95 cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
              >
                {saveHistoryMutation.isPending ? "MENYIMPAN..." : "SIMPAN"}
                <span className="material-symbols-outlined font-black text-xl">
                  save
                </span>
              </button>

              <button
                onClick={resetScan}
                disabled={!predictionResult}
                className={`w-full py-4 rounded-2xl font-black text-base tracking-tight shadow-lg transition-all flex items-center justify-center gap-3 ${predictionResult
                  ? "bg-red-500 text-white hover:-translate-y-1 active:scale-95 cursor-pointer"
                  : "bg-slate-200 text-slate-400 cursor-not-allowed"
                  }`}
              >
                HAPUS
                <span className="material-symbols-outlined font-black text-xl">
                  delete
                </span>
              </button>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary status-pulse"></span>
              <p className="text-[10px] text-on-surface/40 uppercase tracking-[0.2em] font-bold">
                Neural Engine v4.2 Aktif
              </p>
            </div>
          </div>
        </div>
      </div>




      {/* Detailed Analysis Report Overlay - Minimalist Full Page */}
      {showDetail && predictionResult && (
        <div className="fixed inset-0 z-[200] bg-[#f8fafc] overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="max-w-2xl mx-auto px-6 py-12 md:py-20">
            {/* Header Mini */}
            <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100">
              <button
                onClick={() => setShowDetail(false)}
                className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors text-xs font-bold"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                Kembali ke Scan
              </button>
              <div className="text-right">
                <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Report ID</p>
                <p className="text-[10px] font-mono font-bold text-primary">#DS-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
              </div>
            </div>

            {/* Top Section: Photo & Main Result */}
            <div className="flex items-center gap-8 mb-12">
              <div className="w-32 h-32 rounded-[24px] overflow-hidden border-4 border-white shadow-xl flex-shrink-0">
                <img
                  src={capturedImage || (selectedFile ? URL.createObjectURL(selectedFile) : '')}
                  alt="Scan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-[9px] font-black uppercase tracking-wider mb-3">
                  Hasil Diagnosis AI
                </span>
                <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none mb-2">
                  {predictionResult.jerawat}
                </h1>
                <p className="text-xs text-slate-400 font-medium italic">Aether-Med Intelligence Analysis</p>
              </div>
            </div>

            {/* Compact Progress Bars */}
            <div className="space-y-5 mb-12 bg-white p-8 rounded-[32px] border border-slate-50 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Distribusi Deteksi</h3>
              <div className="grid gap-4">
                {predictionResult.predictions.map((pred, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-1.5">
                      <p className="text-xs font-bold text-slate-600">{pred.label}</p>
                      <p className="text-xs font-black text-primary">{pred.persentase}</p>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-1000 ease-out"
                        style={{ width: pred.persentase }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation Mini */}
            <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100/50 flex gap-5 mb-12">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-400 shadow-sm flex-shrink-0">
                <span className="material-symbols-outlined text-xl">lightbulb</span>
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800 mb-1">Rekomendasi Ahli</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  Konsultasikan hasil ini dengan dokter untuk penanganan medis yang tepat. Hindari paparan sinar matahari langsung.
                </p>
              </div>
            </div>

            {/* Action Footer Mini */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  showModal("Tersimpan", "Data diagnosis telah berhasil disimpan ke riwayat kesehatan Anda.", "success");
                  setShowDetail(false);
                }}
                className="flex-grow py-5 bg-primary text-white rounded-3xl font-bold text-sm shadow-xl shadow-primary/20 hover:-translate-y-0.5 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-lg">save</span>
                SIMPAN HASIL
              </button>
              <button
                onClick={resetScan}
                className="px-8 py-5 bg-white border border-red-100 text-red-400 rounded-3xl font-bold text-sm hover:bg-red-50 transition-all flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined text-lg">delete_sweep</span>
                HAPUS
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Modal Popup */}
      {mounted && modalConfig.isOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[var(--dashboard-card-bg)] rounded-[32px] shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 flex flex-col items-center text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${modalConfig.type === "success" ? "bg-green-100 text-green-600" :
                modalConfig.type === "error" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                }`}>
                <span className="material-symbols-outlined text-4xl">
                  {modalConfig.type === "success" ? "check_circle" :
                    modalConfig.type === "error" ? "error" : "info"}
                </span>
              </div>
              <h3 className="text-2xl font-black text-[var(--dashboard-text)] mb-2 tracking-tight">
                {modalConfig.title}
              </h3>
              <p className={`text-sm text-[var(--dashboard-text-secondary)] font-medium leading-relaxed px-4 ${modalConfig.showDontRemindOption ? 'mb-4' : 'mb-8'}`}>
                {modalConfig.message}
              </p>
              {modalConfig.showDontRemindOption && (
                <div className="flex items-center gap-2 mb-6">
                  <input
                    type="checkbox"
                    id="dontRemind"
                    onChange={(e) => {
                      if (e.target.checked) {
                        localStorage.setItem("hideCameraAlert", "true");
                      } else {
                        localStorage.removeItem("hideCameraAlert");
                      }
                    }}
                    className="w-4 h-4 text-primary bg-slate-100 border-slate-300 rounded focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="dontRemind" className="text-xs text-[var(--dashboard-text-secondary)] font-medium cursor-pointer">
                    Jangan tampilkan pesan ini lagi
                  </label>
                </div>
              )}
              <button
                onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}
                className={`w-full py-4 rounded-2xl font-black text-sm tracking-widest uppercase transition-all active:scale-95 ${modalConfig.type === "success" ? "bg-primary text-white shadow-lg shadow-primary/20 hover:bg-[#1c6d00]" :
                  modalConfig.type === "error" ? "bg-red-500 text-white shadow-lg shadow-red-500/20 hover:bg-red-600" :
                    "bg-slate-800 text-white shadow-lg shadow-slate-800/20 hover:bg-slate-900"
                  }`}
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
