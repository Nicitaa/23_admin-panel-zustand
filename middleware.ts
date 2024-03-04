import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"

import type { Database } from "@/interfaces/types_db"
import type { NextRequest } from "next/server"
import axios from "axios"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  return res
}
