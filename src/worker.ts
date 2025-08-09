type AssetFetcher = { fetch: (req: Request, env?: unknown, ctx?: unknown) => Promise<Response> };

export interface Env {
  ASSETS: AssetFetcher;
}

interface Context {
  [key: string]: unknown;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: Context): Promise<Response> {
    const url = new URL(request.url);

    // 處理根目錄，回傳 index.html
    if (url.pathname === "/" || url.pathname === "") {
      const assetURL = new URL(request.url);
      assetURL.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(assetURL, request), env, ctx);
    }

    // 先嘗試以靜態資產回應
    const res = await env.ASSETS.fetch(request, env, ctx);
    if (res.status !== 404) return res;

    // 若為 HTML 請求且無副檔名（SPA fallback），回傳 index.html
    const acceptsHTML = request.headers.get("accept")?.includes("text/html");
    const looksLikeFile = (url.pathname.split("/").pop() || "").includes(".");
    if (acceptsHTML && !looksLikeFile) {
      const assetURL = new URL(request.url);
      assetURL.pathname = "/index.html";
      return env.ASSETS.fetch(new Request(assetURL, request), env, ctx);
    }

    return res;
  },
};

export default worker;
