import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.archonpro.app',
  appName: 'ARCHON.AI',
  webDir: 'out',
  server: {
    // Gebruik de live URL als je Next.js SSR gebruikt (Login/Dashboard/API)
    url: 'https://www.archonpro.com',
    androidScheme: 'https',
  }
};

export default config;
