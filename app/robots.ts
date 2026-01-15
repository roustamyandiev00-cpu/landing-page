import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/admin/', '/api/', '/login', '/register'],
    },
    sitemap: 'https://archonpro.com/sitemap.xml',
  }
}