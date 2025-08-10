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
    try {
      const url = new URL(request.url);

      // 如果請求路徑以 BASE_PATH 開始，直接轉發到 ASSETS
      if (url.pathname.startsWith(BASE_PATH)) {
        // 直接使用原始路徑，因為資產結構已經匹配路由
        return env.ASSETS.fetch(request, env, ctx);
      }

      // 對於不以 BASE_PATH 開始的請求，直接嘗試靜態資源
      return env.ASSETS.fetch(request, env, ctx);
    } catch (error) {
      // 錯誤處理，返回簡單的錯誤頁面
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return new Response(`Error: ${errorMessage}`, { 
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  },
};

export default worker;
