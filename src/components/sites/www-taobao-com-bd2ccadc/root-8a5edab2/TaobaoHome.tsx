"use client";

import { useEffect, useState } from "react";
import { taobaoHomeData } from "./home-content";
import { CategoryPanel } from "./CategoryPanel";
import { ChannelNav } from "./ChannelNav";
import { HeaderSearch } from "./HeaderSearch";
import { LoginModal } from "./LoginModal";
import { MoreDealsBar } from "./MoreDealsBar";
import { PickFeeds } from "./PickFeeds";
import { PromoBanner } from "./PromoBanner";
import { SeoFooter } from "./SeoFooter";
import { SiteNav } from "./SiteNav";
import { ToolkitRail } from "./ToolkitRail";
import { TransformerBoard } from "./TransformerBoard";
import { UserCenter } from "./UserCenter";

export function TaobaoHome() {
  const [loginOpen, setLoginOpen] = useState(true);
  const [fixedSearch, setFixedSearch] = useState(false);

  useEffect(() => {
    const onScroll = () => setFixedSearch(window.scrollY > 99);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="tb-home min-w-[1200px] bg-white text-[#1f1f1f]">
      <SiteNav onLogin={() => setLoginOpen(true)} />
      <div className={fixedSearch ? "wrap-fixed" : undefined}>
        <div className={fixedSearch ? "top" : undefined}>
          <HeaderSearch />
        </div>
      </div>
      <ChannelNav />
      <div className="tb-shell">
        <div className="flex items-stretch">
          <CategoryPanel />
          <div className="mx-4 flex min-w-0 flex-1 flex-col">
            <PromoBanner banners={taobaoHomeData.banners} />
            <TransformerBoard cards={taobaoHomeData.transformerCards} />
          </div>
          <UserCenter data={taobaoHomeData.userCenter} onLogin={() => setLoginOpen(true)} />
        </div>
      </div>
      <PickFeeds items={taobaoHomeData.feeds} />
      <SeoFooter />
      <ToolkitRail items={taobaoHomeData.toolkit} />
      <MoreDealsBar />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
