export type TaobaoLink = {
  name: string;
  href: string;
};

export type TaobaoBanner = {
  id: string;
  title1: string;
  title2: string;
  subtitle: string;
  titleColor: string;
  href: string;
  backgroundImage: string;
  topLogo: string;
};

export type TaobaoChannel = {
  id: string;
  text: string;
  href: string;
  color: string;
  bold: boolean;
  icon: string;
};

export type TaobaoCategory = {
  id: string;
  iconCode: string;
  items: TaobaoLink[];
};

export type TaobaoToolkitItem = {
  id: string;
  key: string;
  label: string;
  href: string;
  icon: string;
};

export type TaobaoCardItem = {
  id: string;
  title: string;
  benefit: string;
  price: string;
  href: string;
  image: string;
};

export type TaobaoTransformerCard = {
  id: string;
  title: string;
  type: "item_large" | "bbs" | "live" | "item_small" | string;
  href: string;
  icon: string;
  background: string;
  items: TaobaoCardItem[];
};

export type TaobaoUserFunction = {
  id: string;
  text: string;
  href: string;
  iconCode: string;
};

export type TaobaoUserCenter = {
  title: string;
  subtitle: string;
  topColor: string;
  bottomColor: string;
  functions: TaobaoUserFunction[];
  benefitImage: string;
  benefitHref: string;
};

export type TaobaoFeedItem = {
  id: string;
  title: string;
  price: string;
  benefit: string;
  href: string;
  image: string;
};

export type TaobaoHomeData = {
  logo: { href: string; alt: string; src: string };
  banners: TaobaoBanner[];
  channels: TaobaoChannel[];
  categories: TaobaoCategory[];
  toolkit: TaobaoToolkitItem[];
  transformerCards: TaobaoTransformerCard[];
  userCenter: TaobaoUserCenter;
  hotWords: string[];
  feeds: TaobaoFeedItem[];
  categoryGif: string;
  seoHtmlNote: string;
};
