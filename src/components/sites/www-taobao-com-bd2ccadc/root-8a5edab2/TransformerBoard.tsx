import type { TaobaoTransformerCard } from "@/types/taobao-home";

function CardHeader({ card }: { card: TaobaoTransformerCard }) {
  return (
    <a href={card.href} className="mb-2 flex items-center gap-1.5">
      {card.icon ? (
        <img src={card.icon} alt={card.title} className="h-4 w-auto" />
      ) : (
        <span className="text-[14px] font-semibold text-[#1f1f1f]">{card.title}</span>
      )}
    </a>
  );
}

function Price({ value }: { value: string }) {
  if (!value) return null;
  const [whole, rest] = value.split(".");
  return (
    <div className="mt-1 flex items-end text-[#ff5000]">
      <span className="mb-[-1px] text-[13px] font-bold leading-5">¥</span>
      <span className="text-[18px] leading-[20px] font-bold tracking-[-0.4px]">{whole}</span>
      {rest ? <span className="mb-[-1px] text-[12px] font-bold">.{rest}</span> : null}
    </div>
  );
}

export function TransformerBoard({ cards }: { cards: TaobaoTransformerCard[] }) {
  const [subsidy, jianghu, live, factory, cheap] = cards;

  return (
    <div className="mt-3 grid h-[128px] grid-cols-5 gap-2">
      {subsidy ? (
        <section className="rounded-xl bg-[#f7f7f7] p-2">
          <CardHeader card={subsidy} />
          <div className="grid grid-cols-2 gap-1.5">
            {subsidy.items.slice(0, 4).map((item) => (
              <a key={item.id} href={item.href} className="block">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="aspect-square w-full rounded-md object-cover" />
                ) : null}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {jianghu ? (
        <section className="overflow-hidden rounded-xl bg-[#f7f7f7] p-2">
          <CardHeader card={jianghu} />
          <ul className="space-y-1.5">
            {jianghu.items.slice(0, 3).map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="line-clamp-2 text-[12px] leading-4 text-[#1f1f1f] hover:text-[#ff5000]"
                >
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {live ? (
        <section className="rounded-xl bg-[#f7f7f7] p-2">
          <CardHeader card={live} />
          <div className="grid grid-cols-2 gap-1.5">
            {live.items.map((item) => (
              <a key={item.id} href={item.href} className="relative block">
                {item.image ? (
                  <img src={item.image} alt={item.benefit || "直播"} className="aspect-square w-full rounded-md object-cover" />
                ) : null}
                {item.benefit ? (
                  <span className="absolute bottom-1 left-1 rounded bg-[#ff5000] px-1 text-[10px] leading-4 text-white">
                    {item.benefit}
                  </span>
                ) : null}
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {factory ? (
        <section className="rounded-xl bg-[#f7f7f7] p-2">
          <CardHeader card={factory} />
          <div className="grid grid-cols-2 gap-1.5">
            {factory.items.map((item) => (
              <a key={item.id} href={item.href} className="block">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="aspect-square w-full rounded-md object-cover" />
                ) : null}
                <Price value={item.price} />
              </a>
            ))}
          </div>
        </section>
      ) : null}

      {cheap ? (
        <section className="rounded-xl bg-[#f7f7f7] p-2">
          <CardHeader card={cheap} />
          <div className="grid grid-cols-2 gap-1.5">
            {cheap.items.map((item) => (
              <a key={item.id} href={item.href} className="block">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="aspect-square w-full rounded-md object-cover" />
                ) : null}
                <Price value={item.price} />
              </a>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
