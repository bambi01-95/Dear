import { ReactNode } from 'react';
import { notFound } from 'next/navigation';

const supportedLanguages = ['ja', 'en'];

interface LangLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>; // params を Promise として定義
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const resolvedParams = await params; // params を await で解決
  const { lang } = resolvedParams;

  if (!supportedLanguages.includes(lang)) {
    notFound();
  }

  return (
    <html lang={lang}>
      <body>
        <header>
          <nav>
            <a href={`/${lang}`}>Home</a> |{' '}
            <a href={`/${lang}/dashboard`}>Dashboard</a>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
