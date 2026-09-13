import type { TaobaoFeedItem } from "@/types/taobao-home";

export function PickFeeds({ items }: { items: TaobaoFeedItem[] }) {
  const cards = items.filter((item) => item.image);

  return (
    <section className="tb-shell mt-[18px] pb-10">
      <div className="mb-3 flex items-center justify-center text-[20px] leading-[30px] font-semibold text-[#1f1f1f]">
        <span className="mr-3 h-px w-6 bg-[#d6d6d6]" />
        猜你喜欢
        <span className="ml-3 h-px w-6 bg-[#d6d6d6]" />
      </div>
      <div className="tb-feed-grid">
        {cards.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="tb-feed-card group mb-4 block px-2"
          >
            <div className="overflow-hidden rounded-xl bg-[#f7f7f7] transition-shadow duration-200 group-hover:rounded-[20px] group-hover:shadow-[0_12px_36px_0_rgba(31,31,51,0.12)]">
              <img
                src={item.image}
                alt={item.title || "商品"}
                className="aspect-square w-full object-cover"
              />
            </div>
            {item.title ? (
              <p className="mt-2 line-clamp-2 text-[14px] leading-5 text-[#1f1f1f]">
                {item.benefit ? (
                  <span className="mr-1 inline-block rounded-sm bg-[#fff1eb] px-1 text-[12px] text-[#ff5000]">
                    {item.benefit}
                  </span>
                ) : null}
                {item.title}
              </p>
            ) : null}
            {item.price ? (
              <div className="mt-1 flex h-6 items-end text-[#ff5000]">
                <span className="mb-[-2px] text-[16px] leading-5 font-bold">¥</span>
                <span className="text-[20px] leading-[22px] font-bold tracking-[-0.4px]">
                  {item.price}
                </span>
              </div>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  );
}
