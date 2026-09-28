import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "RentoCar – Self Drive Car Rental",
  description = "Rent reliable self-drive cars with RentoCar. Choose your car, book online, and start your journey.",
  keywords = "",
  canonical = "/",
  image = "/logo.png",
  author = "RentoCar",
  publisher = "RentoCar",
  jsonLd = null,
  noIndex = false,
}) => {
  // IMPORTANT:
  // Replace this with your real deployed RentoCar domain
  // (or set REACT_APP_SITE_URL in your .env file)
  const siteUrl =
    process.env.REACT_APP_SITE_URL ||
    "https://yourdomain.com";

  // Make sure canonical always starts with /
  const normalizedCanonical = canonical.startsWith("/")
    ? canonical
    : `/${canonical}`;

  const canonicalUrl = `${siteUrl}${normalizedCanonical}`;

  // Convert relative image path into absolute URL
  const imageUrl = image.startsWith("http")
    ? image
    : `${siteUrl}${image.startsWith("/") ? image : `/${image}`}`;

  return (
    <Helmet>
      {/* =========================
          BASIC SEO
      ========================= */}

      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      {keywords && (
        <meta
          name="keywords"
          content={keywords}
        />
      )}

      <meta
        name="author"
        content={author}
      />

      <meta
        name="publisher"
        content={publisher}
      />

      <meta
        name="robots"
        content={noIndex ? "noindex,nofollow" : "index,follow"}
      />

      <link
        rel="canonical"
        href={canonicalUrl}
      />

      {/* =========================
          OPEN GRAPH / FACEBOOK
      ========================= */}

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={canonicalUrl}
      />

      <meta
        property="og:image"
        content={imageUrl}
      />

      <meta
        property="og:site_name"
        content="RentoCar"
      />

      <meta
        property="og:locale"
        content="en_IN"
      />

      {/* =========================
          TWITTER / X
      ========================= */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={imageUrl}
      />

      {/* =========================
          STRUCTURED DATA (JSON-LD)
      ========================= */}

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;