"use client";

import { useState } from "react";
import { ChevronDownIcon, SearchCameraIcon } from "@/components/sites/www-taobao-com-bd2ccadc/shared/icons";
import { taobaoHomeData } from "./home-content";

const searchTabs = ["宝贝", "天猫", "店铺"] as const;

export function HeaderSearch() {
  const [tab, setTab] = useState<(typeof searchTabs)[number]>("宝贝");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { logo, hotWords, userCenter } = taobaoHomeData;

  return (
    <header className="tb-shell pb-2 pt-4">
      <div className="flex items-start">
        <a href={logo.href} className="mt-1 flex w-[240px] shrink-0 items-center px-2">
          <img src={logo.src} alt={logo.alt} className="h-9 w-auto" />
        </a>

        <div className="min-w-0 flex-1 px-6">
          <form
            className="relative flex h-10 items-center rounded-xl bg-[#f5f5f5] pl-2 pr-1"
            action="https://s.taobao.com/search"
            method="get"
            onSubmit={(event) => {
              if (!query.trim()) event.preventDefault();
            }}
          >
            <div className="relative mr-2">
              <button
                type="button"
                className="inline-flex h-8 items-center gap-1 rounded-lg px-2 text-[13px] text-[#1f1f1f] hover:bg-white"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {tab}
                <ChevronDownIcon />
              </button>
              {menuOpen ? (
                <div className="absolute top-9 left-0 z-20 w-20 overflow-hidden rounded-lg bg-white py-1 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
                  {searchTabs.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`block h-8 w-full px-3 text-left text-[13px] hover:bg-[#fff1eb] hover:text-[#ff5000] ${
                        item === tab ? "text-[#ff5000]" : "text-[#1f1f1f]"
                      }`}
                      onClick={() => {
                        setTab(item);
                        setMenuOpen(false);
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <input
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder=""
              className="h-full min-w-0 flex-1 border-0 bg-transparent text-[14px] text-[#1f1f1f] outline-none"
            />
            <button
              type="button"
              className="mr-1 grid size-8 place-items-center text-[#7a7a7a]"
              aria-label="拍照搜索"
            >
              <SearchCameraIcon />
            </button>
            <button
              type="submit"
              className="h-8 w-[67px] rounded-lg bg-[#ff5000] text-[14px] font-medium text-white"
            >
              搜索
            </button>
          </form>
          <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1 overflow-hidden text-[12px] leading-4">
            {hotWords.map((word) => (
              <a
                key={word}
                href={`https://s.taobao.com/search?q=${encodeURIComponent(word)}`}
                className="text-[#7a7a7a] no-underline hover:text-[#ff5000]"
              >
                {word}
              </a>
            ))}
          </div>
        </div>

        <a
          href={userCenter.benefitHref}
          className="mt-1 hidden w-[240px] shrink-0 justify-end px-2 lg:flex"
        >
          <img
            src={userCenter.benefitImage}
            alt="淘宝活动"
            className="h-[36px] w-auto rounded-md object-contain"
          />
        </a>
      </div>
    </header>
  );
}
