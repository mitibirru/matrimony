"use client";

import { useState, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  Camera, X, Crown, Upload, Loader2, AlertTriangle, ImagePlus, Trash2, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MAX_PHOTOS = 6;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

interface PhotoUploaderProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
}

type UploadStatus = "idle" | "uploading" | "success" | "error";

interface SlotState {
  status: UploadStatus;
  progress: number;
  error?: string;
}

const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress as WebP with 0.8 quality
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name.replace(/\.[^/.]+$/, "") + ".webp", {
                type: "image/webp",
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file); // fallback
            }
          },
          "image/webp",
          0.8
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export default function PhotoUploader({ photos, onPhotosChange }: PhotoUploaderProps) {
  const { data: session } = useSession();
  const accessToken = (session as any)?.accessToken;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingSlots, setUploadingSlots] = useState<Record<number, SlotState>>({});
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);
  const [deletingUrl, setDeletingUrl] = useState<string | null>(null);


  // ────── Upload ──────
  const handleFileSelect = async (files: FileList | null) => {
    if (!files || files.length === 0 || !accessToken) return;

    const remaining = MAX_PHOTOS - photos.length;
    if (remaining <= 0) {
      toast.error(`Maximum ${MAX_PHOTOS} photos allowed.`);
      return;
    }

    const filesToUpload = Array.from(files).slice(0, remaining);

    for (const file of filesToUpload) {
      // Client-side validation
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error(`"${file.name}" is not a valid image. Use JPEG, PNG, or WebP.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`"${file.name}" exceeds 10 MB limit.`);
        continue;
      }

      const slotIndex = photos.length + Object.keys(uploadingSlots).length;
      setUploadingSlots((prev) => ({
        ...prev,
        [slotIndex]: { status: "uploading", progress: 0 },
      }));

      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setUploadingSlots((prev) => {
            const slot = prev[slotIndex];
            if (!slot || slot.status !== "uploading") return prev;
            return {
              ...prev,
              [slotIndex]: { ...slot, progress: Math.min(slot.progress + 15, 90) },
            };
          });
        }, 200);

        const formData = new FormData();
        const compressedFile = await compressImage(file);
        formData.append("file", compressedFile);

        const res = await fetch(`${API_URL}/api/upload/photo`, {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` },
          body: formData,
        });

        clearInterval(progressInterval);

        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.message || "Upload failed");
        }

        const data = await res.json();

        setUploadingSlots((prev) => ({
          ...prev,
          [slotIndex]: { status: "success", progress: 100 },
        }));

        // Update photos array
        onPhotosChange([...photos, data.url]);
        toast.success("Photo uploaded!");

        // Clear slot state after animation
        setTimeout(() => {
          setUploadingSlots((prev) => {
            const copy = { ...prev };
            delete copy[slotIndex];
            return copy;
          });
        }, 1000);
      } catch (err: any) {
        setUploadingSlots((prev) => ({
          ...prev,
          [slotIndex]: { status: "error", progress: 0, error: err.message },
        }));
        toast.error(err.message || "Upload failed");

        setTimeout(() => {
          setUploadingSlots((prev) => {
            const copy = { ...prev };
            delete copy[slotIndex];
            return copy;
          });
        }, 2500);
      }
    }
  };

  // ────── Delete ──────
  const handleDelete = async (photoUrl: string) => {
    if (!accessToken) return;
    setDeletingUrl(photoUrl);

    try {
      const res = await fetch(`${API_URL}/api/upload/photo`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photoUrl }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Delete failed");
      }

      onPhotosChange(photos.filter((p) => p !== photoUrl));
      toast.success("Photo deleted");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setDeletingUrl(null);
    }
  };

  // ────── Set Primary ──────
  const handleSetPrimary = async (photoUrl: string) => {
    if (!accessToken || photos[0] === photoUrl) return;

    const newOrder = [photoUrl, ...photos.filter((p) => p !== photoUrl)];

    try {
      const res = await fetch(`${API_URL}/api/upload/photo/reorder`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photos: newOrder }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Reorder failed");
      }

      onPhotosChange(newOrder);
      toast.success("Primary photo updated!");
    } catch (err: any) {
      toast.error(err.message || "Failed to reorder");
    }
  };

  // ────── Drag & Drop ──────
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  // ────── Render ──────
  const totalSlots = MAX_PHOTOS;
  const emptySlots = Math.max(0, totalSlots - photos.length - Object.keys(uploadingSlots).length);

  return (
    <div className="space-y-4">
      {/* Grid */}
      <div
        className={`grid grid-cols-3 sm:grid-cols-3 gap-3 transition-all duration-200 ${
          dragOver ? "ring-2 ring-primary/40 ring-offset-2 rounded-2xl" : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Existing photos */}
        {photos.map((url, i) => (
          <div
            key={url}
            className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer border-2 border-transparent hover:border-primary/30 transition-all duration-200"
            onClick={() => setLightboxUrl(url)}
          >
            {/* Photo */}
            <img
              src={url}
              alt={`Photo ${i + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Primary badge */}
            {i === 0 && (
              <div className="absolute top-1.5 left-1.5 bg-amber-500 text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-md flex items-center gap-1 shadow-lg">
                <Crown className="w-3 h-3" /> Primary
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
              {i !== 0 && (
                <Button
                  size="sm"
                  variant="secondary"
                  className="rounded-lg text-[11px] font-bold h-8 px-2.5 shadow-lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSetPrimary(url);
                  }}
                >
                  <Crown className="w-3 h-3 mr-1" /> Primary
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                className="rounded-lg h-8 w-8 p-0 shadow-lg"
                disabled={deletingUrl === url}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(url);
                }}
              >
                {deletingUrl === url ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
              </Button>
            </div>
          </div>
        ))}

        {/* Uploading slots */}
        {Object.entries(uploadingSlots).map(([idx, slot]) => (
          <div
            key={`uploading-${idx}`}
            className="aspect-square rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 flex items-center justify-center"
          >
            {slot.status === "uploading" && (
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-10 h-10">
                  <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted/30" />
                    <circle
                      cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="2.5"
                      className="text-primary transition-all duration-300"
                      strokeDasharray={`${slot.progress * 0.94} 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-primary">
                    {slot.progress}%
                  </span>
                </div>
                <span className="text-[10px] text-muted-foreground font-semibold">Uploading…</span>
              </div>
            )}
            {slot.status === "success" && (
              <CheckCircle2 className="w-8 h-8 text-green-500 animate-check-pop" />
            )}
            {slot.status === "error" && (
              <div className="flex flex-col items-center gap-1 px-2">
                <AlertTriangle className="w-6 h-6 text-destructive" />
                <span className="text-[9px] text-destructive font-semibold text-center">{slot.error || "Failed"}</span>
              </div>
            )}
          </div>
        ))}

        {/* Empty upload slots */}
        {Array.from({ length: emptySlots }).map((_, i) => (
          <button
            key={`empty-${i}`}
            type="button"
            className="aspect-square rounded-xl border-2 border-dashed border-border bg-muted/20 flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 group/slot"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus className="w-6 h-6 text-muted-foreground/40 group-hover/slot:text-primary/60 transition-colors mb-1" />
            <span className="text-[10px] text-muted-foreground font-semibold group-hover/slot:text-primary/60 transition-colors">
              {photos.length === 0 && i === 0 ? "Add Primary" : `Photo ${photos.length + i + 1}`}
            </span>
          </button>
        ))}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => {
          handleFileSelect(e.target.files);
          e.target.value = ""; // Reset for re-uploads
        }}
      />

      {/* Upload button + info */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] text-muted-foreground font-medium">
          {photos.length}/{MAX_PHOTOS} photos · JPEG, PNG, WebP · Max 10 MB each
        </p>
        {photos.length < MAX_PHOTOS && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-xl text-xs font-bold h-8 gap-1.5"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-3.5 h-3.5" /> Upload
          </Button>
        )}
      </div>

      {/* Tip */}
      {photos.length === 0 && (
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 flex items-start gap-2.5">
          <Camera className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
            Profiles with photos get <span className="font-bold">10x more responses</span>. Add a clear face photo as your primary picture.
          </p>
        </div>
      )}



      {/* Lightbox */}
      {lightboxUrl && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightboxUrl(null)}
        >
          <div className="relative max-w-3xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxUrl}
              alt="Full size preview"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            <button
              className="absolute -top-3 -right-3 w-8 h-8 bg-background border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-muted transition-colors"
              onClick={() => setLightboxUrl(null)}
            >
              <X className="w-4 h-4" />
            </button>
            {/* Show which photo and primary badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2">
              {photos.indexOf(lightboxUrl) === 0 && (
                <span className="bg-amber-500 text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-lg flex items-center gap-1 shadow-lg">
                  <Crown className="w-3 h-3" /> Primary Photo
                </span>
              )}
              <span className="bg-black/60 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                {photos.indexOf(lightboxUrl) + 1} of {photos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
