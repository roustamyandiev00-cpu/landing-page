import Image from "next/image"

export function AppStoreBadges() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
      {/* App Store Badge */}
      <a
        href="https://apps.apple.com/app/archon-ai/id123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-transform hover:scale-105"
      >
        <Image
          src="/badges/app-store-badge-nl.svg"
          alt="Download on the App Store"
          width={150}
          height={44}
          className="h-12 w-auto"
        />
      </a>

      {/* Google Play Badge */}
      <a
        href="https://play.google.com/store/apps/details?id=com.archonpro.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block transition-transform hover:scale-105"
      >
        <Image
          src="/badges/google-play-badge-nl.png"
          alt="Ontdek het op Google Play"
          width={150}
          height={44}
          className="h-12 w-auto"
        />
      </a>
    </div>
  )
}

export function AppStoreBadge() {
  return (
    <a
      href="https://apps.apple.com/app/archon-ai/id123456789"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition-transform hover:scale-105"
    >
      <Image
        src="/badges/app-store-badge-nl.svg"
        alt="Download on the App Store"
        width={135}
        height={40}
        className="h-10 w-auto"
      />
    </a>
  )
}

export function GooglePlayBadge() {
  return (
    <a
      href="https://play.google.com/store/apps/details?id=com.archonpro.app"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block transition-transform hover:scale-105"
    >
      <Image
        src="/badges/google-play-badge-nl.png"
        alt="Ontdek het op Google Play"
        width={135}
        height={40}
        className="h-10 w-auto"
      />
    </a>
  )
}