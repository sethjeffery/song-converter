import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="min-h-screen bg-stone-100 text-gray-800 dark:bg-slate-800 dark:text-gray-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
