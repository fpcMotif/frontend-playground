"use client";

import { useEffect, useState } from "react";

export function MouseCursors() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [aiPosition, setAiPosition] = useState({ x: 300, y: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animate AI cursor
    const interval = setInterval(() => {
      setAiPosition((prev) => ({
        x: prev.x + (Math.random() - 0.5) * 100,
        y: prev.y + (Math.random() - 0.5) * 100,
      }));
    }, 2000);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* User cursor */}
      <div
        className="pointer-events-none fixed z-9999 hidden lg:block"
        style={{
          left: position.x - 12,
          top: position.y - 12,
          transition: "left 0.1s, top 0.1s",
        }}
      >
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
          <title>User Cursor</title>
          <path
            d="M18.0228 2.76754C20.0108 2.08778 21.9122 3.98917 21.2325 5.97719L16.3148 20.3592C15.5635 22.5565 12.4955 22.663 11.5936 20.523L9.26183 14.9899C9.21397 14.8764 9.12362 14.786 9.01006 14.7382L3.477 12.4064C1.33701 11.5045 1.44346 8.43653 3.64082 7.68519L18.0228 2.76754Z"
            fill="#8751E6"
          />
        </svg>
        <div className="mt-1 ml-4 rounded border border-gray-200 bg-white px-2 py-1 font-medium text-xs shadow-sm">
          you
        </div>
      </div>

      {/* AI cursor */}
      <div
        className="pointer-events-none fixed z-9998 hidden lg:block"
        style={{
          left: aiPosition.x,
          top: aiPosition.y,
          transition: "left 2s ease-in-out, top 2s ease-in-out",
        }}
      >
        <svg fill="none" height="24" viewBox="0 0 24 24" width="24">
          <title>AI Cursor</title>
          <path
            d="M18.0228 2.76754C20.0108 2.08778 21.9122 3.98917 21.2325 5.97719L16.3148 20.3592C15.5635 22.5565 12.4955 22.663 11.5936 20.523L9.26183 14.9899C9.21397 14.8764 9.12362 14.786 9.01006 14.7382L3.477 12.4064C1.33701 11.5045 1.44346 8.43653 3.64082 7.68519L18.0228 2.76754Z"
            fill="#8751E6"
          />
        </svg>
        <div className="mt-1 ml-4 rounded border border-[#8751E6]/30 bg-[#8751E6]/10 px-2 py-1 font-medium text-[#8751E6] text-xs">
          Library Assistant
        </div>
      </div>
    </>
  );
}
