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
  console.log("document", { isProduction });
  return (
    <Html lang="en">
      <Head />
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
