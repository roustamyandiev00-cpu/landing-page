import { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Hoe maak je een perfecte bouwofferte in 2025? | ARCHON.AI",
  description: "Ontdek de 7 essentiële stappen voor het maken van professionele bouwoffertes die klanten overtuigen. Inclusief gratis template en AI-tips.",
  keywords: "bouwofferte maken, offerte template, bouwofferte voorbeeld, professionele offerte, bouw calculatie",
}

export default function BlogPost() {
  return (
    <main className="min-h-screen">
      <Header />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Hoe maak je een perfecte bouwofferte in 2025?
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            7 essentiële stappen voor professionele offertes die klanten overtuigen
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time>15 januari 2025</time>
            <span>•</span>
            <span>8 minuten leestijd</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Een goede bouwofferte is de sleutel tot meer opdrachten en hogere winstmarges. 
            In 2025 verwachten klanten niet alleen een accurate prijsberekening, maar ook 
            een professionele presentatie en snelle levering. Hier leer je hoe.
          </p>

          <h2>1. Zorg voor een professionele uitstraling</h2>
          <p>
            Je offerte is vaak het eerste wat een potentiële klant van je bedrijf ziet. 
            Een professioneel vormgegeven document met je logo, contactgegevens en 
            consistente huisstijl maakt direct een goede indruk.
          </p>

          <h2>2. Wees specifiek in je omschrijvingen</h2>
          <p>
            Vage omschrijvingen zoals &quot;diverse werkzaamheden&quot; leiden tot misverstanden. 
            Beschrijf precies wat je gaat doen:
          </p>
          <ul>
            <li>Welke materialen gebruik je?</li>
            <li>Hoeveel vierkante meters?</li>
            <li>Welke kwaliteit/merk?</li>
            <li>Inclusief of exclusief BTW?</li>
          </ul>

          <h2>3. Gebruik realistische prijzen</h2>
          <p>
            Te lage prijzen maken klanten wantrouwig, te hoge prijzen kosten je opdrachten. 
            Baseer je prijzen op:
          </p>
          <ul>
            <li>Actuele materiaalkosten</li>
            <li>Realistische arbeidsuren</li>
            <li>Overhead en winstmarge</li>
            <li>Onvoorziene kosten (5-10%)</li>
          </ul>

          <h2>4. Stel duidelijke voorwaarden</h2>
          <p>
            Vermeld altijd:
          </p>
          <ul>
            <li>Geldigheidsduur van de offerte</li>
            <li>Betalingsvoorwaarden</li>
            <li>Wat er niet inbegrepen is</li>
            <li>Aansprakelijkheid en garanties</li>
          </ul>

          <h2>5. Maak gebruik van AI-tools</h2>
          <p>
            Moderne bouwsoftware zoals ARCHON.AI kan je helpen om:
          </p>
          <ul>
            <li>Automatisch prijzen te berekenen</li>
            <li>Professionele templates te gebruiken</li>
            <li>Fouten te voorkomen</li>
            <li>Tijd te besparen (tot 5 uur per week!)</li>
          </ul>

          <h2>6. Volg op na verzending</h2>
          <p>
            Stuur je offerte niet zomaar op en wacht af. Bel binnen 2-3 dagen om te vragen 
            of er vragen zijn. Dit toont professionaliteit en verhoogt je kans op de opdracht.
          </p>

          <h2>7. Leer van afwijzingen</h2>
          <p>
            Vraag altijd feedback bij afgewezen offertes. Was het de prijs? De planning? 
            De communicatie? Deze informatie helpt je om toekomstige offertes te verbeteren.
          </p>

          <h2>Conclusie</h2>
          <p>
            Een perfecte bouwofferte in 2025 combineert professionaliteit, specificiteit 
            en snelheid. Door gebruik te maken van moderne tools en deze 7 stappen te 
            volgen, verhoog je significant je kans op nieuwe opdrachten.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold mb-2">
              Wil je automatisch professionele offertes maken?
            </h3>
            <p className="mb-4">
              Probeer ARCHON.AI gratis en maak je eerste offerte in 2 minuten.
            </p>
            <a 
              href="/register" 
              className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Start gratis proefperiode
            </a>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  )
}