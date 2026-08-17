"use client";

import { useRef, useState } from "react";
import { UploadCloud, File as FileIcon, X } from "lucide-react";

const MAX_FILES = 5;
const MAX_FILE_SIZE = 4 * 1024 * 1024;
const MAX_TOTAL_SIZE = 4 * 1024 * 1024;

export default function FileDropzone({ files, setFiles, label, hint, dragLabel }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = (list) => {
    const next = [...files];
    let total = next.reduce((sum, f) => sum + f.size, 0);
    for (const f of Array.from(list)) {
      if (next.length >= MAX_FILES) break;
      if (f.size > MAX_FILE_SIZE) continue;
      if (total + f.size > MAX_TOTAL_SIZE) continue;
      next.push(f);
      total += f.size;
    }
    setFiles(next);
  };

  const removeFile = (idx) => setFiles(files.filter((_, i) => i !== idx));

  return (
    <div>
      <label className="text-sm font-semibold text-ink-800">{label}</label>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          addFiles(e.dataTransfer.files);
        }}
        className={`mt-2 cursor-pointer rounded-xl border-2 border-dashed px-5 py-8 text-center transition-colors ${
          dragOver ? "border-gold-500 bg-gold-50" : "border-ink-900/15 bg-white hover:border-gold-400"
        }`}
      >
        <UploadCloud size={28} className="mx-auto text-gold-500" />
        <p className="mt-3 text-sm font-semibold text-ink-800">{dragLabel}</p>
        <p className="mt-1 text-xs text-ink-500">{hint}</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.pdf,.dcm"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>
      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li
              key={i}
              className="flex items-center justify-between gap-3 rounded-lg bg-cream border border-ink-900/5 px-3.5 py-2.5 text-sm"
            >
              <span className="flex items-center gap-2 min-w-0 text-ink-700">
                <FileIcon size={15} className="shrink-0 text-gold-600" />
                <span className="truncate">{f.name}</span>
                <span className="shrink-0 text-ink-400 text-xs">{(f.size / 1024 / 1024).toFixed(1)} MB</span>
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="shrink-0 text-ink-400 hover:text-red-500"
                aria-label="Remove file"
              >
                <X size={15} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
