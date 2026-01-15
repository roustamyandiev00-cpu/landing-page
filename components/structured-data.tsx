export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ARCHON.AI",
    "description": "AI-aangedreven software voor bouwprofessionals. Maak professionele offertes in 2 minuten met onze slimme AI.",
    "url": "https://archonpro.com",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "description": "Gratis proefversie beschikbaar"
    },
    "creator": {
      "@type": "Organization",
      "name": "ARCHON.AI",
      "url": "https://archonpro.com"
    },
    "keywords": "bouwsoftware, AI, offertes, bouw, constructie, automatisering, Nederland",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  }

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ARCHON.AI",
    "url": "https://archonpro.com",
    "logo": "https://archonpro.com/logo.png",
    "description": "AI-aangedreven software voor bouwprofessionals",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL"
    },
    "sameAs": [
      "https://linkedin.com/company/archon-ai",
      "https://twitter.com/archon_ai"
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
    </>
  )
}