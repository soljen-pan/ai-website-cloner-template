import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { extname } from "node:path";

const destDir = new URL(
  "../public/sites/www-taobao-com-bd2ccadc/root-8a5edab2/images/",
  import.meta.url,
);
const sharedDir = new URL(
  "../public/sites/www-taobao-com-bd2ccadc/shared/",
  import.meta.url,
);
const urlFile = new URL("/tmp/taobao-probe/asset-urls.txt", import.meta.url);

function filenameFor(url) {
  const clean = url.split("?")[0];
  const ext = extname(clean).slice(0, 6) || ".png";
  const hash = createHash("sha256").update(url).digest("hex").slice(0, 10);
  const base = clean.split("/").pop()?.replace(/[^a-zA-Z0-9._-]/g, "") || "asset";
  return `${base.slice(0, 40)}-${hash}${ext}`;
}

async function downloadOne(url, dest) {
  const res = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
      Referer: "https://www.taobao.com/",
    },
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

const urls = (await readFile(urlFile, "utf8"))
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean);

await mkdir(destDir, { recursive: true });
await mkdir(sharedDir, { recursive: true });

const manifest = {};
const queue = [...urls];
const workers = 4;
let ok = 0;
let fail = 0;

async function worker() {
  while (queue.length) {
    const url = queue.shift();
    if (!url) return;
    const name = filenameFor(url);
    const dest = new URL(name, destDir);
    try {
      const size = await downloadOne(url, dest);
      manifest[url] = `/sites/www-taobao-com-bd2ccadc/root-8a5edab2/images/${name}`;
      ok += 1;
      console.log("ok", size, name);
    } catch (err) {
      fail += 1;
      console.error("fail", url, err instanceof Error ? err.message : err);
    }
  }
}

await Promise.all(Array.from({ length: workers }, () => worker()));
await writeFile(
  new URL(
    "../docs/research/www-taobao-com-bd2ccadc/root-8a5edab2/ASSET_MANIFEST.json",
    import.meta.url,
  ),
  JSON.stringify(manifest, null, 2),
);
console.log(JSON.stringify({ ok, fail, total: urls.length }));
