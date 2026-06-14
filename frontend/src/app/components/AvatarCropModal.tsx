import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';

interface AvatarCropModalProps {
  imageSrc: string;
  onClose: () => void;
  onCropComplete: (croppedFile: File) => void;
}

export default function AvatarCropModal({ imageSrc, onClose, onCropComplete }: AvatarCropModalProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropCompleteHandler = useCallback((croppedArea: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      setIsProcessing(true);
      const croppedImage = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        0
      );
      if (croppedImage) {
        onCropComplete(croppedImage);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="relative bg-[var(--dashboard-card-bg)] border border-[var(--dashboard-border)] rounded-[2rem] p-6 sm:p-8 max-w-lg w-full shadow-2xl flex flex-col">
        <h3 className="text-xl font-extrabold tracking-tight mb-4" style={{ color: 'var(--dashboard-text)' }}>
          Atur Foto Profil
        </h3>
        
        <div className="relative w-full h-64 sm:h-80 bg-gray-900 rounded-xl overflow-hidden mb-6">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={setZoom}
          />
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <label className="text-xs font-bold uppercase tracking-widest text-center" style={{ color: 'var(--dashboard-text-secondary)' }}>Zoom</label>
          <input
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-labelledby="Zoom"
            onChange={(e) => setZoom(Number(e.target.value))}
            className="w-full accent-[#84F75E]"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 hover:opacity-80 active:scale-95"
            style={{ color: 'var(--dashboard-text-secondary)', background: 'var(--dashboard-sidebar-active-bg)' }}
            disabled={isProcessing}
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleCrop}
            className="px-6 py-2 rounded-full text-xs font-black tracking-wide shadow-md hover:scale-[1.03] active:scale-95 transition-all duration-200 disabled:opacity-60"
            style={{
              background: 'linear-gradient(135deg, #84F75E 0%, #1C6D00 100%)',
              color: '#ffffff',
            }}
            disabled={isProcessing}
          >
            {isProcessing ? 'Memproses...' : 'Terapkan'}
          </button>
        </div>
      </div>
    </div>
  );
}
