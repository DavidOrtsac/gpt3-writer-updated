import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="GPT-3 Writer" key="title"/>
        <meta property="og:description" content="The Debate Generator" key="description"/>
        <meta
          property="og:image"
          content=""
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
        
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
