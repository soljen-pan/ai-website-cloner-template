"use client";

import { useState } from "react";
import { TbIcon } from "@/components/sites/www-taobao-com-bd2ccadc/shared/icons";
import { taobaoHomeData } from "./home-content";

export function CategoryPanel() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = taobaoHomeData.categories.find((item) => item.id === openId);

  return (
    <aside
      className="relative z-20 h-[332px] w-[256px] shrink-0 overflow-visible rounded-xl bg-[#f7f7f7]"
      onMouseLeave={() => setOpenId(null)}
    >
      <div className="py-2">
        {taobaoHomeData.categories.map((row) => (
          <div
            key={row.id}
            className="mx-2 flex h-8 items-center rounded px-2.5 text-[14px] leading-8 text-[#1f1f1f] transition-colors duration-200 hover:bg-white"
            onMouseEnter={() => setOpenId(row.id)}
          >
            <TbIcon code={row.iconCode} className="mr-2.5 text-[16px]" />
            {row.items.map((item, index) => (
              <span key={item.name} className="inline-flex items-center">
                <a href={item.href} className="hover:text-[#ff5000]">
                  {item.name}
                </a>
                {index < row.items.length - 1 ? (
                  <span className="inline-block w-[21px] text-center text-[#1f1f1f]">
                    /
                  </span>
                ) : null}
              </span>
            ))}
          </div>
        ))}
      </div>
      {open ? (
        <div className="absolute top-0 left-[248px] z-30 min-h-[332px] w-[360px] rounded-xl border-2 border-[#ff5000] bg-white p-4 shadow-sm">
          <div className="mb-3 text-[16px] font-semibold text-[#1f1f1f]">
            {open.items[0]?.name}
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-2 text-[14px] leading-[22px]">
            {open.items.map((item) => (
              <a key={item.name} href={item.href} className="hover:text-[#ff5000]">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </aside>
  );
}
