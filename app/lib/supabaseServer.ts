// lib/supabaseServer.ts
import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const ANON =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || // 또는 새 네이밍을 쓴다면 PUBLISHABLE_KEY
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export async function supabaseServer() {
  // Next.js 15: 반드시 await cookies()
  const cookieStore = await cookies();

  return createServerClient(URL, ANON, {
    cookies: {
      // ✅ 새 시그니처: getAll / setAll
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Component(읽기 전용 쿠키 컨텍스트)에서 setAll 호출 시 무시
        }
      },
    },
  });
}

// 관리자(서비스 롤) — 서버에서만 사용
export function supabaseAdmin() {
  return createClient(URL, SERVICE, { auth: { persistSession: false } });
}
