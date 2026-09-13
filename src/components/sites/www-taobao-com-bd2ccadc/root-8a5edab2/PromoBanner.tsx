"use client";

import { useEffect, useState } from "react";
import type { TaobaoBanner } from "@/types/taobao-home";

export function PromoBanner({ banners }: { banners: TaobaoBanner[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % banners.length);
    }, 4000);
    return () => window.clearInterval(timer);
  }, [banners.length]);

  const current = banners[index];
  if (!current) return null;

  return (
    <div className="relative h-[192px] overflow-hidden rounded-xl">
      {banners.map((banner, i) => (
        <a
          key={banner.id}
          href={banner.href}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${banner.backgroundImage})` }}
        >
          <div className="relative z-10 ml-4 mt-4 w-[calc(100%-16px)]" style={{ color: banner.titleColor }}>
            {banner.topLogo ? (
              <img src={banner.topLogo} alt="" className="mb-1 h-4 w-auto" />
            ) : null}
            <div className="h-7 overflow-hidden text-[20px] leading-7 font-semibold">
              {banner.title1}
            </div>
            <div className="mt-[-2px] h-7 overflow-hidden text-[20px] leading-7 font-semibold">
              {banner.title2}
            </div>
            <div className="mt-0.5 h-[22px] overflow-hidden text-[14px] leading-[22px]">
              {banner.subtitle}
            </div>
          </div>
        </a>
      ))}
      <div className="absolute right-3 bottom-3 z-10 flex gap-1.5">
        {banners.map((banner, i) => (
          <button
            key={banner.id}
            type="button"
            aria-label={`幻灯片 ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-4 bg-white" : "w-1.5 bg-white/55"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
