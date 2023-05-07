import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="The Worksheet Generator — DC" key="title"/>
        <meta property="og:description" content="The Worksheet Generator" key="description"/>
        <meta
          property="og:image"
          content=""
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
  <script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/39533509.js"></script>
        
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
