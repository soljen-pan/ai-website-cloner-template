import { seoParagraphs } from "./home-content";

export function SeoFooter() {
  return (
    <footer className="mt-5 bg-white">
      <div className="tb-shell border-t-2 border-[#ff4400] py-3">
        <div className="px-4 text-[12px] leading-6 text-[#1f1f1f]">
          {seoParagraphs.map((block) => (
            <p key={block.body.slice(0, 12)} className="mb-2">
              {block.title ? (
                <strong className="block text-[16px] leading-[30px]">{block.title}</strong>
              ) : null}
              {block.body}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
