// /middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// 認証を必要とするパス一覧
const protectedPaths = ['/dashboard', '/posts', '/profile']

// サポートする言語
const supportedLanguages = ['ja', 'en']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1. ルートへのアクセスならデフォルト言語にリダイレクト（例：ja）
  if (pathname === '/') {
    const acceptLang = req.headers.get('accept-language')
    const preferredLang = acceptLang?.split(',')[0].split('-')[0] || 'en'

    const lang = supportedLanguages.includes(preferredLang) ? preferredLang : 'en'
    return NextResponse.redirect(new URL(`/${lang}`, req.url))
  }

  // 2. 認証チェック：保護されたページ + トークンがない場合は /auth/login にリダイレクト
  const token = req.cookies.get('token')?.value
  if (protectedPaths.some(path => pathname.startsWith(path)) && !token) {
    const loginUrl = req.nextUrl.clone()
    loginUrl.pathname = '/auth/login'
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

// middleware を適用するルートを指定
export const config = {
  matcher: ['/', '/dashboard/:path*', '/posts/:path*', '/profile/:path*'],
}