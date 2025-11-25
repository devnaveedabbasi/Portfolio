"use client";
import React, { useEffect, useRef, useState } from "react";
import Quill from "quill";

interface QuillEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
}

export default function QuillEditor({
  value,
  onChange,
  placeholder = "Enter content...",
  className = "",
}: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<Quill | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !editorRef.current || quillRef.current) return;

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      placeholder: placeholder,
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike"],
          [{ color: [] }, { background: [] }],
          [{ script: "sub" }, { script: "super" }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ align: [] }],
          ["blockquote", "code-block"],
          ["link", "image", "video"],
          ["clean"],
        ],
      },
      formats: [
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "color",
        "background",
        "script",
        "list",
        "bullet",
        "indent",
        "align",
        "blockquote",
        "code-block",
        "link",
        "image",
        "video",
      ],
    });

    quillRef.current = quill;

    // Set initial value
    if (value) {
      quill.root.innerHTML = value;
    }

    // Handle changes
    quill.on("text-change", () => {
      const content = quill.root.innerHTML;
      onChange(content || "");
    });

    return () => {
      if (quillRef.current) {
        quillRef.current.off("text-change");
      }
    };
  }, [isClient, onChange, placeholder]);

  // Update editor content when value prop changes externally
  useEffect(() => {
    if (quillRef.current && isClient && value !== undefined) {
      const currentContent = quillRef.current.root.innerHTML;
      if (currentContent !== value) {
        quillRef.current.root.innerHTML = value;
      }
    }
  }, [value, isClient]);

  if (!isClient) {
    return (
      <div className="flex h-64 w-full items-center justify-center rounded-lg bg-gray-800 text-gray-400">
        Loading editor...
      </div>
    );
  }

  return (
    <div
      className={`quill-editor ${className}`}
      style={{
        borderRadius: "0.5rem",
        overflow: "hidden",
      }}
    >
      <div
        ref={editorRef}
        style={{
          backgroundColor: "#1f2937",
          color: "white",
          minHeight: "300px",
        }}
      />
    </div>
  );
}
