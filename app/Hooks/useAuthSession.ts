// app/hooks/useAuthSession.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../lib/supabaseClient";

export function useAuthSession(initial?: {
  isLoggedIn?: boolean;
  userEmail?: string;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!initial?.isLoggedIn);
  const [userEmail, setUserEmail] = useState<string | undefined>(
    initial?.userEmail
  );
  const router = useRouter();

  useEffect(() => {
    const supabase = supabaseBrowser();

    // 1) 마운트 시 즉시 현재 사용자 확인
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data.user);
      setUserEmail(data.user?.email ?? undefined);
    });

    // 2) 상태 변화(로그인/로그아웃) 구독
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session?.user);
      setUserEmail(session?.user?.email ?? undefined);
      // 서버 컴포넌트 리프레시(헤더 등 서버에서 그리는 부분 최신화)
      router.refresh();
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [router]);

  return { isLoggedIn, userEmail };
}
