"use client";

import { TbIcon } from "@/components/sites/www-taobao-com-bd2ccadc/shared/icons";
import type { TaobaoUserCenter } from "@/types/taobao-home";

export function UserCenter({
  data,
  onLogin,
}: {
  data: TaobaoUserCenter;
  onLogin: () => void;
}) {
  return (
    <aside
      className="flex h-[332px] w-[256px] shrink-0 flex-col overflow-hidden rounded-xl"
      style={{
        background: `linear-gradient(180deg, ${data.topColor} 0%, ${data.bottomColor} 48%, #ffffff 100%)`,
      }}
    >
      <div className="flex flex-1 flex-col items-center px-4 pt-7 text-center">
        <div className="mb-3 grid size-14 place-items-center rounded-full bg-white shadow-sm">
          <span className="text-[28px] text-[#d6d6d6]">👤</span>
        </div>
        <div className="text-[16px] leading-6 font-semibold text-[#1f1f1f]">{data.title}</div>
        <div className="mt-1 text-[12px] leading-5 text-[#7a7a7a]">{data.subtitle}</div>
        <button
          type="button"
          onClick={onLogin}
          className="mt-4 h-8 w-[120px] rounded-full bg-[#ff5000] text-[14px] font-medium text-white"
        >
          登录
        </button>
        <a href="https://register.taobao.com/" className="mt-2 text-[12px] text-[#7a7a7a] hover:text-[#ff5000]">
          免费注册
        </a>
      </div>
      <div className="grid grid-cols-4 gap-1 px-3 pb-4">
        {data.functions.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="flex flex-col items-center gap-1 text-[11px] leading-4 text-[#1f1f1f] hover:text-[#ff5000]"
          >
            <TbIcon code={item.iconCode} className="text-[18px]" />
            {item.text}
          </a>
        ))}
      </div>
    </aside>
  );
}
