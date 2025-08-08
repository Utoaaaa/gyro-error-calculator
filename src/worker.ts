const BASE_PATH = "/gyro-error-calculator";

type AssetFetcher = { fetch: (req: Request, env?: unknown, ctx?: unknown) => Promise<Response> };

export interface Env {
  ASSETS: AssetFetcher;
}

export default {
  async fetch(request: Request, env: Env, ctx: any): Promise<Response> {
    const url = new URL(request.url);

    // 直接處理子路徑根目錄，回傳對應的 index.html
    if (url.pathname === BASE_PATH || url.pathname === `${BASE_PATH}/`) {
      const assetURL = new URL(request.url);
      assetURL.pathname = `${BASE_PATH}/index.html`;
      return env.ASSETS.fetch(new Request(assetURL, request), env, ctx);
    }

    // 先嘗試以靜態資產回應
    let res = await env.ASSETS.fetch(request, env, ctx);
    if (res.status !== 404) return res;

    // 若為 HTML 請求且無副檔名（SPA fallback），回傳子路徑 index.html
    const acceptsHTML = request.headers.get("accept")?.includes("text/html");
    const looksLikeFile = (url.pathname.split("/").pop() || "").includes(".");
    if (acceptsHTML && url.pathname.startsWith(BASE_PATH) && !looksLikeFile) {
      const assetURL = new URL(request.url);
      assetURL.pathname = `${BASE_PATH}/index.html`;
      return env.ASSETS.fetch(new Request(assetURL, request), env, ctx);
    }

    return res;
  },
};
