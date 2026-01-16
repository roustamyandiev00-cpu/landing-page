export function StructuredData() {
  // Software Application Schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ARCHON.AI",
    "description": "AI-aangedreven bouwsoftware voor aannemers en ZZP'ers. Maak professionele offertes in 2 minuten, herken risico's automatisch en optimaliseer prijzen.",
    "url": "https://www.archonpro.com",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Construction Management Software",
    "operatingSystem": ["Web Browser", "iOS", "Android"],
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "149",
      "priceCurrency": "EUR",
      "offerCount": "3",
      "offers": [
        {
          "@type": "Offer",
          "name": "Starter Plan",
          "price": "0",
          "priceCurrency": "EUR",
          "description": "Gratis proefversie voor 14 dagen"
        },
        {
          "@type": "Offer",
          "name": "Professional Plan",  
          "price": "49",
          "priceCurrency": "EUR",
          "description": "Voor ZZP'ers en kleine aannemers"
        }
      ]
    },
    "creator": {
      "@type": "Organization",
      "name": "ARCHON.AI"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "screenshot": "https://www.archonpro.com/dashboard-preview.png",
    "softwareVersion": "2.0",
    "datePublished": "2024-01-01",
    "inLanguage": "nl",
    "keywords": "bouwsoftware, offerte software, calculatiesoftware, AI bouw, aannemer software"
  }

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ARCHON.AI",
    "alternateName": "ArchonPro",
    "url": "https://www.archonpro.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.archonpro.com/logo.png",
      "width": 250,
      "height": 60
    },
    "description": "AI-aangedreven software voor bouwprofessionals. Automatiseer offertes, herken risico's en optimaliseer prijzen.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL",
      "addressLocality": "Netherlands"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "support@archonpro.com",
      "availableLanguage": ["Dutch", "English"]
    },
    "sameAs": [
      "https://linkedin.com/company/archon-ai",
      "https://twitter.com/archon_ai",
      "https://facebook.com/archonai"
    ],
    "foundingDate": "2024",
    "founders": [
      {
        "@type": "Person",
        "name": "ARCHON.AI Team"
      }
    ]
  }

  // WebSite Schema with Search Action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ARCHON.AI",
    "url": "https://www.archonpro.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.archonpro.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Hoeveel kost ARCHON.AI bouwsoftware?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ARCHON.AI heeft een gratis proefperiode van 14 dagen. Daarna start het vanaf 49 euro per maand voor ZZP'ers en kleine aannemers. Er zijn ook Pro en Enterprise plannen beschikbaar."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe snel kan ik een offerte maken met ARCHON.AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Met ARCHON.AI maak je een professionele bouwofferte in ongeveer 2 minuten. De AI herkent automatisch risicos en berekent prijzen op basis van marktdata en je historische projecten."
        }
      },
      {
        "@type": "Question",
        "name": "Is ARCHON.AI geschikt voor ZZP'ers in de bouw?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, ARCHON.AI is speciaal ontworpen voor ZZP'ers, kleine aannemers en bouwbedrijven in Nederland en Vlaanderen. Het Starter plan is perfect voor zzpers die professionele offertes willen maken."
        }
      },
      {
        "@type": "Question",
        "name": "Werkt ARCHON.AI ook op mobiel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, ARCHON.AI werkt op alle apparaten. Je kunt offertes maken op je laptop, tablet of smartphone via de browser of onze native iOS en Android apps."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe werkt de AI in ARCHON.AI?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De AI van ARCHON.AI analyseert bouwprojecten, herkent automatisch risicos, berekent realistische prijzen op basis van marktdata en je historische projecten, en optimaliseert je offertes voor maximale winstkansen."
        }
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
