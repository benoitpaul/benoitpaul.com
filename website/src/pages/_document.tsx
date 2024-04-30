import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";

type MyDocumentProps = {
  isProduction: boolean;
};

function MyDocument({ isProduction }: MyDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <body>
        <Main />
        <NextScript />
        {isProduction && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NKSVPLZ"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}
      </body>
    </Html>
  );
}

MyDocument.getInitialProps = async (
  context: DocumentContext
): Promise<MyDocumentProps & DocumentInitialProps> => {
  const ctx = await Document.getInitialProps(context);

  return { ...ctx, isProduction: process.env.NODE_ENV === "production" };
};

export default MyDocument;
