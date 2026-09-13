import type { TaobaoHomeData } from "@/types/taobao-home";
import raw from "./home-data.json";

export const taobaoHomeData = raw as TaobaoHomeData;

export const siteNavLeft = [
  { label: "中国大陆", href: "#", hasMenu: true },
  { label: "亲，请登录", href: "#login", accent: true },
  { label: "免费注册", href: "https://register.taobao.com/" },
] as const;

export const siteNavRight = [
  { label: "网页无障碍", href: "https://www.taobao.com/markets/accessibility" },
  { label: "商家支持", href: "https://myseller.taobao.com/", hasMenu: true },
  { label: "网站导航", href: "https://www.taobao.com/tbhome/page/market-list", hasMenu: true },
  { label: "已买到的宝贝", href: "https://buyertrade.taobao.com/trade/itemlist/list_bought_items.htm" },
  { label: "我的淘宝", href: "https://i.taobao.com/", hasMenu: true },
  { label: "购物车", href: "https://cart.taobao.com/" },
  { label: "收藏夹", href: "https://favorite.taobao.com/", hasMenu: true },
  { label: "手机版", href: "https://www.taobao.com/m" },
  { label: "淘宝网首页", href: "https://www.taobao.com/" },
] as const;

export const seoParagraphs = [
  {
    title: "Taobao | 淘宝",
    body: "淘宝网是阿里巴巴集团旗下的国际化网络购物平台，淘宝网为消费者提供互动化、个性化的购物体验。消费者能够从天猫品牌旗舰店、淘宝直播间实物展示、网红主播评论区真实的买家秀获取相关度高的商品信息，也能通过淘宝百科学习生活知识，畅享美好购物生活。",
  },
  {
    title: "",
    body: "淘宝网页通过提供多样化的男装空调女鞋等企业品牌商品和服务，为消费者及采购商提供各类运动鞋与篮球鞋购物体验。其中电脑、按摩椅、iphone17手机等热门商品更是赢得了用户口碑和良好的评价。",
  },
  {
    title: "",
    body: "手机淘宝不定期推出各种活动，并在服装、美妆、数码、游戏等行业为您进行定制化推荐，提供担保交易(先收货后付款)等安全交易保障服务，并由商家提供退货承诺、破损补寄来保障消费者权益。",
  },
];
