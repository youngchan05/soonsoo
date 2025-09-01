export async function GET() {
  console.log(process.env.NEXT_PUBLIC_SUPABASE_URL); // 서버 터미널에 출력
  return Response.json({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ set" : "❌",
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ set" : "❌",
  });
}
