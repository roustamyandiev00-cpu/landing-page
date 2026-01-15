import { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Blog - ARCHON.AI | Tips voor Bouwprofessionals",
  description: "Ontdek tips, tricks en inzichten voor bouwprofessionals. Leer hoe AI je bouwbedrijf kan helpen groeien.",
  keywords: "bouw blog, bouwsoftware tips, AI in de bouw, offertes maken, bouwbedrijf automatiseren",
}

const blogPosts = [
  {
    title: "Hoe maak je een perfecte bouwofferte in 2025?",
    excerpt: "7 essentiële stappen voor professionele offertes die klanten overtuigen. Inclusief tips voor AI-tools en automatisering.",
    date: "2025-01-15",
    slug: "hoe-maak-je-perfecte-bouwofferte-2025"
  },
  {
    title: "5 Manieren om je Offertes te Versnellen met AI",
    excerpt: "Ontdek hoe AI-technologie je kan helpen om professionele offertes te maken in een fractie van de tijd.",
    date: "2025-01-12",
    slug: "offertes-versnellen-met-ai"
  },
  {
    title: "Waarom Digitalisering Essentieel is voor Bouwbedrijven",
    excerpt: "De bouwsector digitaliseert snel. Leer waarom je nu moet beginnen en hoe je de eerste stappen zet.",
    date: "2025-01-10",
    slug: "digitalisering-bouwbedrijven"
  }
]

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">
            Blog voor Bouwprofessionals
          </h1>
          <p className="text-xl text-muted-foreground mb-12 text-center">
            Tips, inzichten en trends voor moderne bouwbedrijven
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article key={post.slug} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-xl font-semibold mb-3">
                  <a href={`/blog/${post.slug}`} className="hover:text-primary">
                    {post.title}
                  </a>
                </h2>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <time className="text-sm text-muted-foreground">{post.date}</time>
              </article>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}