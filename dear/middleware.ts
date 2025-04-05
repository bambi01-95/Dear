// /middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 認証を必要とするパス一覧
const protectedPaths = ['/dashboard', '/posts', '/profile']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ログイン済みかを Cookie で判定（例："token" が存在していればOK）
  const token = req.cookies.get('token')?.value

  // 認証が必要なページかつトークンがない場合 → /auth/login にリダイレクト
  if (protectedPaths.some(path => pathname.startsWith(path)) && !token) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/auth/login'
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// どのルートに適用するか（matcher指定）
export const config = {
  matcher: ['/dashboard/:path*', '/posts/:path*', '/profile/:path*'],
}