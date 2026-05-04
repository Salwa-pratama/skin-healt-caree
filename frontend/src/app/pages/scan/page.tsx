"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePredictMutation } from "@/features/scan/api/scan.api";
import { useSaveHistoryMutation } from "@/features/history/api/history.api";
import { FaceLandmarker, FilesetResolver, DrawingUtils } from "@mediapipe/tasks-vision";
import Sidebar from "@/app/components/Sidebar";
import DashboardHeader from "@/app/components/DashboardHeader";
import MobileNav from "@/app/components/MobileNav";
import "./scan.css";
import "../dashboard/dashboard.css";

export default function Analisis() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"live" | "upload">("live");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [predictionResult, setPredictionResult] = useState<{
    jerawat: string;
    predictions: { label: string; confidence: number }[];
  } | null>(null);
  const [faceLandmarker, setFaceLandmarker] = useState<FaceLandmarker | null>(null);
  const [faceDetected, setFaceDetected] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [capturedFile, setCapturedFile] = useState<File | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  
  const predictMutation = usePredictMutation();
  const saveHistoryMutation = useSaveHistoryMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
          console.error("Gagal akses kamera:", err);
          alert("Gagal mengakses kamera. Pastikan izin kamera telah diberikan.");
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
        if (canvasCtx && canvasRef.current) {
          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          
          if (results.faceLandmarks && results.faceLandmarks.length > 0) {
            setFaceDetected(true);
            const drawingUtils = new DrawingUtils(canvasCtx);
            for (const landmarks of results.faceLandmarks) {
              drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_TESSELATION, { color: "#C0C0C030", lineWidth: 1 });
              drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE, { color: "#84f75e" });
              drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, { color: "#84f75e" });
              drawingUtils.drawConnectors(landmarks, FaceLandmarker.FACE_LANDMARKS_FACE_OVAL, { color: "#84f75e" });
            }
          } else {
            setFaceDetected(false);
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
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        const imageData = canvasRef.current.toDataURL("image/jpeg");
        setCapturedImage(imageData);
        setIsCameraActive(false);

        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
            setCapturedFile(file);
          }
        }, "image/jpeg");
      }
    }
  };

  const handleLivePredict = () => {
    if (capturedFile) {
      predictMutation.mutate(capturedFile, {
        onSuccess: (resData: any) => {
          if (resData?.data) {
             setPredictionResult(resData.data);
          }
        },
        onError: (err: any) => {
          console.error("Live Analysis Error:", err);
          alert("Gagal melakukan analisis kulit. Pastikan koneksi server tersedia.");
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

  const handleSubmit = () => {
    if (selectedFile) {
      console.log("Starting Upload Analysis for:", selectedFile.name);
      predictMutation.mutate(selectedFile, {
        onSuccess: (resData: any) => {
          console.log("Upload Prediction Success:", resData);
          if (resData?.data) {
             setPredictionResult(resData.data);
          } else {
             alert("Data tidak valid dari server.");
          }
        },
        onError: (err: any) => {
          console.error("Upload Analysis Error:", err);
          const errorMsg = err.response?.data?.message || "Gagal melakukan analisis kulit.";
          alert(errorMsg);
        }
      });
    }
  };

  return (
    <div className="bg-[#f8f9fa] text-[#191c1d] antialiased overflow-x-hidden min-h-screen font-manrope">
      <DashboardHeader 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />

      <Sidebar activePage="scan" isOpen={isSidebarOpen} />

      <MobileNav activePage="scan" />

      {/* Main Content Area - Fixed Sidebar Overlap */}
      <main className={`transition-all duration-500 pt-20 px-4 sm:px-6 md:px-10 pb-32 lg:pb-12 min-h-screen ${isSidebarOpen ? "lg:ml-64" : "lg:ml-0"}`}>
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
            {/* Mode Segmented Control */}
            {!predictionResult && (
              <div className="bg-surface-container-high p-0.5 rounded-xl flex w-fit">
                <button
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    activeTab === "live"
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
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 ${
                    activeTab === "upload"
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

          <div className="grid grid-cols-12 gap-6 md:gap-8">
            {/* Left Column: Skin Analysis Content */}
            <div className="col-span-12 lg:col-span-8 flex flex-col gap-6 md:gap-8">
              {/* Main Container */}
              <div className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] relative min-h-[500px] flex flex-col border border-slate-100">
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
                                {faceDetected ? 'Sistem: Wajah Terdeteksi' : 'Sistem: Mencari Wajah...'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Capture Button Overlay */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
                          <div className="flex flex-col items-center gap-4">
                            {!faceDetected && (
                              <div className="bg-red-500/80 backdrop-blur-md px-4 py-1.5 rounded-full animate-bounce">
                                <p className="text-[10px] font-bold text-white uppercase tracking-widest">Posisikan Wajah Anda</p>
                              </div>
                            )}
                            <button 
                              onClick={captureImage}
                              disabled={predictMutation.isPending || !faceDetected}
                              className={`w-16 h-16 rounded-full border-4 ${faceDetected ? 'border-white' : 'border-white/30'} flex items-center justify-center group active:scale-90 transition-all`}
                            >
                              <div className={`w-12 h-12 rounded-full ${!faceDetected || predictMutation.isPending ? 'bg-slate-400' : 'bg-primary'} group-hover:scale-110 transition-transform flex items-center justify-center`}>
                                <span className="material-symbols-outlined text-white">
                                  {predictMutation.isPending ? 'sync' : 'camera'}
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
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                        {!predictionResult && <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>}
                        
                        {predictMutation.isPending ? (
                          <div className="z-10 flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Menganalisis Kulit...</p>
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
                  <div className="relative flex-grow bg-slate-50 flex flex-col items-center justify-center p-12 min-h-[400px]">
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
                        <h3 className="text-xl font-extrabold text-on-surface mb-2">
                          Unggah Foto Pasien
                        </h3>
                        <p className="text-sm text-on-surface/50 text-center font-medium">
                          Tarik dan lepas file di sini atau{" "}
                          <span className="text-primary font-bold">
                            cari file
                          </span>{" "}
                          untuk memulai analisis.
                        </p>
                        <div className="mt-8 flex gap-3 text-[10px] font-black uppercase tracking-widest text-on-surface/30">
                          <span>JPG</span>
                          <span className="w-1 h-1 bg-on-surface/20 rounded-full self-center"></span>
                          <span>PNG</span>
                          <span className="w-1 h-1 bg-on-surface/20 rounded-full self-center"></span>
                          <span>Maks 10MB</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full max-w-md glass-panel rounded-3xl border-2 border-primary/60 p-8 flex flex-col items-center shadow-lg">
                        <div className="w-full max-h-64 bg-slate-100 rounded-xl mb-6 overflow-hidden flex justify-center">
                          <img src={URL.createObjectURL(selectedFile)} alt="Preview" className="h-full object-cover" />
                        </div>
                        {!predictionResult && <p className="text-sm font-bold text-slate-700 truncate w-full text-center mb-6">{selectedFile.name}</p>}
                        {!predictionResult && (
                          <div className="flex gap-4 w-full">
                            <button onClick={() => setSelectedFile(null)} className="flex-1 py-3 bg-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-300 transition-colors">
                              Batal
                            </button>
                            <button 
                              onClick={handleSubmit} 
                              disabled={predictMutation.isPending}
                              className="flex-1 py-3 bg-primary text-white rounded-xl font-bold hover:bg-[#1c6d00] transition-colors disabled:opacity-50"
                            >
                              {predictMutation.isPending ? "Menganalisis..." : "Proses Analisis"}
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Removed result div to show uploaded photo preview clearly */}

                    <p className="mt-8 text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em] flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs">
                        verified_user
                      </span>
                      Data terenkripsi dan aman
                    </p>
                  </div>
                )}

                {/* Footer HUD */}
                <div className="p-8 bg-black/5 backdrop-blur-md flex justify-between items-end border-t border-slate-100">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary status-pulse"></span>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-on-surface/50">
                        Fase Bio-Analisis 3
                      </span>
                    </div>
                    <h3 className="text-2xl font-black tracking-tight text-on-surface">
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
                <div className="bg-surface-container-low rounded-lg p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/30">
                      Profil Komposisi
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-white/50 p-3 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-on-surface/40 mb-2">
                        Kering
                      </p>
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/40"
                          style={{ width: "33%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-on-surface mb-2">
                        Berjerawat
                      </p>
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: "88%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="bg-white/50 p-3 rounded-xl text-center">
                      <p className="text-[10px] font-bold text-on-surface/40 mb-2">
                        Berminyak
                      </p>
                      <div className="h-1 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/40"
                          style={{ width: "50%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-low rounded-lg p-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/30 mb-2">
                      Tingkat Hidrasi
                    </p>
                    <p className="text-4xl font-black text-on-background">
                      84<span className="text-primary text-xl ml-1">%</span>
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm hover:scale-105 transition-transform cursor-pointer">
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
              <div className="bg-surface-container-low rounded-lg p-6 md:p-8">
                <h3 className="font-extrabold text-xs md:text-sm uppercase tracking-widest mb-6">
                  Masalah Terdeteksi
                </h3>
                <div className="space-y-3">
                  {(predictionResult ? predictionResult.predictions : [
                    { label: "Pustules", confidence: 0 },
                    { label: "Papules", confidence: 0 },
                    { label: "Cyst", confidence: 0 },
                    { label: "Blackhead", confidence: 0 },
                    { label: "Whitehead", confidence: 0 },
                  ]).map((pred, index) => (
                    <div key={index} className="group">
                      <div className="flex justify-between items-center mb-1.5 px-1">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                          {pred.label}
                        </span>
                        <span className="text-[10px] font-black text-primary">
                          {pred.confidence.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(28,109,0,0.3)]" 
                          style={{ width: `${pred.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Final CTA */}
              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={() => {
                    if (predictionResult && capturedImage) {
                      saveHistoryMutation.mutate({
                        citra: capturedImage,
                        name: predictionResult.jerawat,
                        predictions: predictionResult.predictions
                      }, {
                        onSuccess: () => {
                          alert("Hasil analisis berhasil disimpan!");
                          resetScan();
                        },
                        onError: (error: any) => {
                          console.error("Save History Error:", error);
                          alert("Gagal menyimpan hasil analisis.");
                        }
                      });
                    }
                  }}
                  disabled={!predictionResult || saveHistoryMutation.isPending}
                  className={`w-full py-4 rounded-2xl font-black text-base tracking-tight shadow-lg transition-all flex items-center justify-center gap-3 ${
                    predictionResult 
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
                  className={`w-full py-4 rounded-2xl font-black text-base tracking-tight shadow-lg transition-all flex items-center justify-center gap-3 ${
                    predictionResult 
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
      </main>

      <footer className="lg:ml-72 bg-white py-6 px-12 border-t border-slate-100 hidden lg:block">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface/30">
            © 2024 Clinical Ethereal MedTech.
          </p>
          <div className="flex gap-8">
            <Link
              className="text-on-surface/30 hover:text-on-surface transition-colors text-[10px] font-bold uppercase tracking-[0.2em]"
              href="#"
            >
              Privasi
            </Link>
            <Link
              className="text-on-surface/30 hover:text-on-surface transition-colors text-[10px] font-bold uppercase tracking-[0.2em]"
              href="#"
            >
              Standar
            </Link>
          </div>
        </div>
      </footer>

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
                      <p className="text-xs font-black text-primary">{pred.confidence.toFixed(1)}%</p>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000 ease-out"
                        style={{ width: `${pred.confidence}%` }}
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
                  alert("Tersimpan di History!");
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
    </div>
  );
}
