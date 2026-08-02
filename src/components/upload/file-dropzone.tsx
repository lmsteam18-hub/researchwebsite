"use client";

import * as React from "react";
import { useDropzone, type FileRejection } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { File, FileText, ImageIcon, Trash2, UploadCloud } from "lucide-react";
import { cn, formatBytes } from "@/lib/utils";
import { ACCEPTED_UPLOAD_TYPES, MAX_UPLOAD_BYTES } from "@/lib/validations";

export interface UploadedFile {
  id: string;
  file: File;
}

function iconFor(name: string) {
  if (/\.(png|jpe?g|gif|webp)$/i.test(name)) return ImageIcon;
  if (/\.(doc|docx|pdf|tex)$/i.test(name)) return FileText;
  return File;
}

export function FileDropzone({
  files,
  onChange,
}: {
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
}) {
  const [error, setError] = React.useState<string | null>(null);

  const onDrop = React.useCallback(
    (accepted: File[], rejections: FileRejection[]) => {
      setError(null);
      if (rejections.length) {
        setError(rejections[0].errors[0]?.message ?? "Some files were rejected.");
      }
      const mapped = accepted.map((file) => ({
        id: `${file.name}-${file.size}-${file.lastModified}`,
        file,
      }));
      // De-dupe by id.
      const merged = [...files];
      for (const f of mapped) {
        if (!merged.some((m) => m.id === f.id)) merged.push(f);
      }
      onChange(merged);
    },
    [files, onChange],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_UPLOAD_TYPES,
    maxSize: MAX_UPLOAD_BYTES,
  });

  function remove(id: string) {
    onChange(files.filter((f) => f.id !== id));
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={cn(
          "group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border p-8 text-center transition-all hover:border-brand-400 hover:bg-brand-50/40 dark:hover:bg-brand-500/5",
          isDragActive && "border-brand-500 bg-brand-50/60 dark:bg-brand-500/10",
        )}
      >
        <input {...getInputProps()} aria-label="Upload project files" />
        <span className="grid size-14 place-items-center rounded-2xl bg-brand-gradient-soft text-brand-600 transition-transform group-hover:scale-110 dark:text-brand-300">
          <UploadCloud className="size-7" />
        </span>
        <p className="mt-4 font-medium">
          {isDragActive ? "Drop your files here" : "Drag & drop files, or click to browse"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          DOC, DOCX, PDF, PPT, PPTX, XLS, CSV, ZIP, RAR, LaTeX, images — up to{" "}
          {formatBytes(MAX_UPLOAD_BYTES, 0)}
        </p>
      </div>

      {error && <p className="mt-2 text-sm text-destructive">{error}</p>}

      <AnimatePresence>
        {files.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 space-y-2"
          >
            {files.map((f) => {
              const Icon = iconFor(f.file.name);
              return (
                <motion.li
                  key={f.id}
                  layout
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
                >
                  <span className="grid size-9 place-items-center rounded-lg bg-muted text-brand-600">
                    <Icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{f.file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatBytes(f.file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(f.id)}
                    aria-label={`Remove ${f.file.name}`}
                    className="grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
