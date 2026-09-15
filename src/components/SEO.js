import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({
  title = "RentoCar – Self Drive Car Rental",
  description = "Rent reliable self-drive cars with RentoCar. Choose your car, book online, and start your journey.",
  canonical = "/",
  image = "/logo.png",
  noIndex = false,
}) => {
  // IMPORTANT:
  // Replace this with your real deployed RentoCar domain
  const siteUrl = "https://yourdomain.com";

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
    </Helmet>
  );
};

export default SEO;