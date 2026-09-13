export function MoreDealsBar() {
  return (
    <a
      href="https://s.taobao.com/search?q=9.9"
      className="fixed bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] text-[#1f1f1f] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
    >
      <span className="inline-flex size-5 items-center justify-center rounded-full bg-[#ff5000] text-[10px] text-white">
        ¥
      </span>
      更多低价商品
      <span className="text-[10px] text-[#999]">⌄</span>
    </a>
  );
}
