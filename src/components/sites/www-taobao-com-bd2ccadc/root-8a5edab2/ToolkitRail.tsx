import type { TaobaoToolkitItem } from "@/types/taobao-home";

export function ToolkitRail({ items }: { items: TaobaoToolkitItem[] }) {
  return (
    <aside className="pointer-events-none fixed top-1/2 right-0 z-40 hidden -translate-y-1/2 md:block">
      <ul className="pointer-events-auto w-14 overflow-hidden rounded-l-[20px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        {items.map((item, index) => (
          <li key={item.id}>
            <a
              href={item.href.startsWith("//") ? `https:${item.href}` : item.href}
              className={`flex h-[52px] flex-col items-center justify-center gap-0.5 text-[11px] leading-[14px] text-[#1f1f1f] hover:bg-[#fff1eb] hover:text-[#ff5000] ${
                index === 0 ? "rounded-tl-[20px]" : ""
              }`}
            >
              <img src={item.icon} alt="" className="size-5 object-contain" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
