// lib/supabaseClient.ts
"use client";
import { createBrowserClient } from "@supabase/ssr";

export function supabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        // ⬇️ 해시 기반(implicit) 플로우로 전환 — 이메일 인증/매직링크에 더 견고
        flowType: "implicit",
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        // storageKey: 'sb-soonsoo', // (선택) 프로젝트별 키 분리하고 싶으면
      },
    }
  );
}
