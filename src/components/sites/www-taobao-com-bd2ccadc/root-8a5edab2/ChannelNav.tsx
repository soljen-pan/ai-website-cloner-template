import { taobaoHomeData } from "./home-content";

export function ChannelNav() {
  return (
    <nav className="tb-shell mb-2">
      <ul className="flex h-[34px] items-center gap-6">
        {taobaoHomeData.channels.map((channel) => (
          <li key={channel.id}>
            <a
              href={channel.href}
              className="inline-flex items-center gap-1 text-[14px] leading-[22px] no-underline"
              style={{
                color: channel.color,
                fontWeight: channel.bold ? 600 : 400,
              }}
            >
              {channel.icon ? (
                <img src={channel.icon} alt="" className="size-4 object-contain" />
              ) : null}
              {channel.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
