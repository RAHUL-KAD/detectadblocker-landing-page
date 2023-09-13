import Document, { Head, Html, Main, NextScript } from "next/document";
// Importing the Google Analytics Measurement ID from the environment variable
const gtag = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`;

const isProd = process.env.NODE_ENV === "production";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
        <link rel="icon" href="/favicon.svg" />
          <meta
            name="description"
            content="Enhance AI with Synthetic data"
          />
          <meta property="og:site_name" content="voxlab.co" />
          <meta
            property="og:description"
            content="Free AI Powered Image Processing Tools."
          />
          <meta property="og:title" content="Enhance AI with Synthetic data" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Enhance AI with Synthetic data" />
          <meta
            name="twitter:description"
            content="Enhance AI with Synthetic data"
          />
          {/* Add Image here for a preview */}
          <meta
            property="og:image"
            content="https://ik.imagekit.io/uti9laa1e/VoxLab_landing_page_-_2?updatedAt=1688952849312"
          />
          <meta
            name="twitter:image"
            content="https://ik.imagekit.io/uti9laa1e/VoxLab_landing_page_-_2?updatedAt=1688952849312"
          />

          <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}></script>

          {/* Google Analytics Measurement ID*/}
          <script async src={gtag} />
          {/* {/ Inject the GA tracking code with the Measurement ID /} */}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname
                });
              `,
            }}
          />

        </Head>
        {/* <body className="bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')]"> */}
        <body>
          <Main />
          <NextScript />
        </body >
      </Html>
    );
  }
}

export default MyDocument;
