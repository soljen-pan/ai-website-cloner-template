"use client";

import { ChevronDownIcon } from "@/components/sites/www-taobao-com-bd2ccadc/shared/icons";
import { siteNavLeft, siteNavRight } from "./home-content";

function NavLink({
  label,
  href,
  hasMenu,
  accent,
  onLogin,
}: {
  label: string;
  href: string;
  hasMenu?: boolean;
  accent?: boolean;
  onLogin?: () => void;
}) {
  const isLogin = href === "#login";
  return (
    <a
      href={isLogin ? "#login" : href}
      onClick={(event) => {
        if (isLogin) {
          event.preventDefault();
          onLogin?.();
        }
      }}
      className={`inline-flex items-center gap-0.5 px-2 text-[12px] leading-[35px] no-underline hover:text-[#ff5000] ${
        accent ? "text-[#ff5000]" : "text-[#6c6c6c]"
      }`}
    >
      {label}
      {hasMenu ? <ChevronDownIcon className="opacity-70" /> : null}
    </a>
  );
}

export function SiteNav({ onLogin }: { onLogin: () => void }) {
  return (
    <nav className="h-[35px] border-b border-[#ebebeb] bg-[#f5f5f5] text-[12px]">
      <div className="tb-shell flex h-full items-center justify-between">
        <div className="flex items-center">
          {siteNavLeft.map((item) => (
            <NavLink key={item.label} {...item} onLogin={onLogin} />
          ))}
        </div>
        <div className="flex items-center">
          {siteNavRight.map((item) => (
            <NavLink key={item.label} {...item} />
          ))}
        </div>
      </div>
    </nav>
  );
}
