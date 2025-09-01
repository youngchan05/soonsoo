"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/app/lib/supabaseClient";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const supabase = supabaseBrowser();

      // 1) 해시 토큰 처리 (implicit)
      if (
        typeof window !== "undefined" &&
        window.location.hash.includes("access_token")
      ) {
        const h = new URLSearchParams(window.location.hash.slice(1));
        const access_token = h.get("access_token") || undefined;
        const refresh_token = h.get("refresh_token") || undefined;
        if (access_token && refresh_token) {
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
          if (!error) {
            history.replaceState(null, "", window.location.pathname);
            router.replace("/");
            router.refresh();
            return;
          }
        }
      }

      // 2) 해시가 없는 경우 그냥 홈으로
      router.replace("/");
    })();
  }, [router]);

  return null;
}
