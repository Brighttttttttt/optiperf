import { type NextRequest } from "next/server";
import { mettreAJourSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return mettreAJourSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
