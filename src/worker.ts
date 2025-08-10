const BASE_PATH = "/gyro-error-calculator";

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

    // 如果請求路徑以 BASE_PATH 開始，需要移除 BASE_PATH 前綴來找到實際的靜態資源
    if (url.pathname.startsWith(BASE_PATH)) {
      // 移除 BASE_PATH 前綴，獲取實際的資源路徑
      const assetPath = url.pathname.slice(BASE_PATH.length);
      
      // 如果是根路徑或空路徑，返回 index.html
      if (assetPath === "" || assetPath === "/") {
        const assetURL = new URL(request.url);
        assetURL.pathname = "/index.html";
        return env.ASSETS.fetch(new Request(assetURL, request), env, ctx);
      }
      
      // 其他路徑直接查找對應的靜態資源
      const assetURL = new URL(request.url);
      assetURL.pathname = assetPath;
      const res = await env.ASSETS.fetch(new Request(assetURL, request), env, ctx);
      
      // 如果找到資源，直接返回
      if (res.status !== 404) return res;
      
      // 如果沒找到且是 HTML 請求（SPA fallback），返回 index.html
      const acceptsHTML = request.headers.get("accept")?.includes("text/html");
      const looksLikeFile = (assetPath.split("/").pop() || "").includes(".");
      if (acceptsHTML && !looksLikeFile) {
        const fallbackURL = new URL(request.url);
        fallbackURL.pathname = "/index.html";
        return env.ASSETS.fetch(new Request(fallbackURL, request), env, ctx);
      }
      
      return res;
    }

    // 對於不以 BASE_PATH 開始的請求，直接嘗試靜態資源
    return env.ASSETS.fetch(request, env, ctx);
  },
};

export default worker;
