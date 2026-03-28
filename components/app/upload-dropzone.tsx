"use client";

import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { useRef, useState } from "react";

import { ACCEPTED_IMAGE_TYPES, MAX_UPLOAD_SIZE_BYTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

type UploadDropzoneProps = {
  disabled?: boolean;
  error?: string | null;
  fileName?: string | null;
  previewUrl?: string | null;
  onFileSelected: (file: File | null) => void;
};

export function UploadDropzone({
  disabled = false,
  error,
  fileName,
  previewUrl,
  onFileSelected,
}: UploadDropzoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">Screenshot upload</h2>
        <p className="mt-1 text-sm text-[var(--muted)]">PNG, JPEG, or WebP up to {(MAX_UPLOAD_SIZE_BYTES / (1024 * 1024)).toFixed(0)} MB.</p>
      </div>

      <div
        className={cn(
          "surface relative overflow-hidden rounded-[2rem] border border-dashed p-6 shadow-sm transition",
          isDragging ? "border-amber-500 bg-amber-50/60" : "border-[var(--line)]",
          disabled && "opacity-70",
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          const file = event.dataTransfer.files.item(0);
          onFileSelected(file);
        }}
      >
        <input
          ref={inputRef}
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
          className="sr-only"
          disabled={disabled}
          onChange={(event) => {
            const file = event.target.files?.item(0) ?? null;
            onFileSelected(file);
          }}
          type="file"
        />

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-4">
            <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-900">
              <ImagePlus className="size-5" />
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold">Drop a website screenshot here</p>
              <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
                SnapLayout extracts reusable structure from the screenshot and turns it into an editable project.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button disabled={disabled} onClick={() => inputRef.current?.click()} type="button" variant="outline">
                Choose file
              </Button>
              {fileName ? (
                <Button disabled={disabled} onClick={() => onFileSelected(null)} type="button" variant="ghost">
                  <X className="size-4" />
                  Clear
                </Button>
              ) : null}
            </div>
            {fileName ? <p className="text-sm font-medium">Selected: {fileName}</p> : null}
            {error ? <p className="text-sm text-red-700" role="alert">{error}</p> : null}
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-[var(--line)] bg-[var(--canvas)]">
            {previewUrl ? (
              <Image
                alt="Uploaded screenshot preview"
                className="h-full max-h-[18rem] w-full object-cover"
                height={720}
                src={previewUrl}
                unoptimized
                width={1280}
              />
            ) : (
              <div className="flex min-h-[18rem] items-center justify-center p-8 text-center text-sm leading-7 text-[var(--muted)]">
                Your screenshot preview appears here before analysis.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
