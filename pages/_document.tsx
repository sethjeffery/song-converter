import Document, { Html, Head, Main, NextScript } from "next/document"

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" type="image/svg+xml" href="/favicon.svg"/>
          <link rel="icon" type="image/png" href="/favicon.png"/>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-192x192.png"/>
          <meta name="theme-color" content="#1E293C" />

          <meta name='application-name' content='Song Converter' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content='Song Converter' />
          <meta name='description' content='Convert song files from various formats' />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='msapplication-TileColor' content='#1E293C' />
          <meta name='msapplication-tap-highlight' content='no' />
        </Head>
        <body className="min-h-screen bg-stone-100 text-gray-800 dark:bg-slate-800 dark:text-gray-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
