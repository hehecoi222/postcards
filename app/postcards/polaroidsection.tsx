import React, { useRef, useEffect } from "react";
import gsap from "gsap";

interface Props {
  text: string;
  animate?: boolean;
}

export default function PolaroidSection({ text, animate }: Props) {
  const handRef = useRef<SVGSVGElement>(null);
  const photoRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    if (!animate) return;
    const tl = gsap.timeline();
    // Start with hand + photo offscreen and photo invisible
    gsap.set(handRef.current, { x: 150, opacity: 1 });
    gsap.set(photoRef.current, { opacity: 0 });

    tl.to(handRef.current, { x: 0, duration: 0.6, ease: "power3.out" }) // Hand moves in
      .to(photoRef.current, { opacity: 1, duration: 0.3 }, "-=0.2")     // Photo appears
      .to(handRef.current, { y: 100, opacity: 0, duration: 0.7, delay: 0.4, ease: "power1.in" }); // Hand exits
    // Hand withdraws, photo stays
  }, [animate]);

  return (
    <div className="flex flex-1 flex-row items-center justify-between w-full">
      {/* Left: Text */}
      <div className="w-1/2 flex items-center justify-center p-6">
        <div className="text-xl md:text-2xl font-bold">{text}</div>
      </div>
      {/* Right: Animation */}
      <div className="w-1/2 flex items-center justify-center relative h-full">
        {/* SVG: Polaroid + Hand */}
        <svg
          width="320"
          height="320"
          viewBox="0 0 320 320"
          fill="none"
          className="overflow-visible"
        >
          {/* Polaroid Photo */}
          <rect
            ref={photoRef}
            x="60"
            y="80"
            width="140"
            height="140"
            rx="12"
            fill="#fff"
            stroke="#222"
            strokeWidth="4"
            filter="url(#shadow)"
          />
          {/* A simple photo image rectangle (simulate photo) */}
          <rect
            x="85"
            y="105"
            width="90"
            height="80"
            rx="6"
            fill="#d1d5db"
            stroke="#888"
            strokeWidth="2"
          />
          {/* Hand (simplified shape) */}
          <g ref={handRef}>
            <path
              d="M130 200 Q135 170 150 180 Q155 160 170 180 Q175 160 190 185 Q200 175 210 200 Q220 230 200 240 Q180 250 170 240 Q155 225 140 220 Z"
              fill="#f6e4d2"
              stroke="#bfa07a"
              strokeWidth="4"
            />
          </g>
          <defs>
            <filter id="shadow" x="0" y="0" width="200%" height="200%">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#000" floodOpacity="0.1" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}