import { Metadata } from 'next'
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "5 Kostbare Fouten die Bouwers Maken bij Offertes (en Hoe je ze Voorkomt) | ARCHON.AI",
  description: "Ontdek de 5 meest gemaakte fouten bij bouwoffertes die je opdrachten kosten. Leer hoe je deze valkuilen vermijdt en meer klanten wint.",
  keywords: "bouwofferte fouten, offerte maken tips, bouwbedrijf fouten, professionele offertes, bouw calculatie fouten",
}

export default function BlogPost() {
  return (
    <main className="min-h-screen">
      <Header />
      <article className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            5 Kostbare Fouten die Bouwers Maken bij Offertes (en Hoe je ze Voorkomt)
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Deze fouten kosten je gemiddeld 3 opdrachten per maand - tijd om ze te stoppen
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time>16 januari 2025</time>
            <span>•</span>
            <span>7 minuten leestijd</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            Na 15 jaar in de bouwsector heb ik duizenden offertes gezien. De beste bouwers 
            maken dezelfde fouten keer op keer - fouten die hen gemiddeld 3 opdrachten per 
            maand kosten. Hier zijn de 5 grootste valkuilen en hoe je ze voorkomt.
          </p>

          <h2>Fout #1: Vage omschrijvingen gebruiken</h2>
          <p>
            <strong>De fout:</strong> &quot;Badkamer renovatie - €8.500&quot;
          </p>
          <p>
            <strong>Waarom dit fout gaat:</strong> Klanten weten niet wat ze krijgen. Ze gaan 
            vergelijken met andere offertes en kiezen vaak voor de goedkoopste, omdat ze het 
            verschil niet zien.
          </p>
          <p>
            <strong>De oplossing:</strong> Wees specifiek in je omschrijvingen:
          </p>
          <ul>
            <li>Tegels: Villeroy & Boch, 60x60cm, antislip</li>
            <li>Sanitair: Geberit hangtoilet + softclose zitting</li>
            <li>Douche: Inloopdouche 120x90cm, 8mm glas</li>
            <li>Inclusief: Sloop, afvoer, elektrische aansluitingen</li>
          </ul>

          <h2>Fout #2: Te lage prijzen door angst</h2>
          <p>
            <strong>De fout:</strong> Je verlaagt je prijs omdat je bang bent de klus niet te krijgen.
          </p>
          <p>
            <strong>Waarom dit fout gaat:</strong> Lage prijzen maken klanten wantrouwig. Ze denken: 
            &quot;Wat is er mis? Gebruikt hij goedkope materialen? Heeft hij geen ervaring?&quot;
          </p>
          <p>
            <strong>De oplossing:</strong> Bereken je echte kosten:
          </p>
          <ul>
            <li>Materiaalkosten + 15% onvoorzien</li>
            <li>Arbeidsuren × €45-65 per uur</li>
            <li>Overhead (verzekering, gereedschap, transport)</li>
            <li>Winstmarge (minimaal 20%)</li>
          </ul>

          <h2>Fout #3: Geen deadline voor de offerte</h2>
          <p>
            <strong>De fout:</strong> Je stuurt een offerte zonder te vermelden hoe lang deze geldig is.
          </p>
          <p>
            <strong>Waarom dit fout gaat:</strong> Klanten laten je offerte maandenlang liggen, 
            terwijl materiaalkosten stijgen. Uiteindelijk bel je en moet je de prijs verhogen.
          </p>
          <p>
            <strong>De oplossing:</strong> Vermeld altijd:
          </p>
          <ul>
            <li>&quot;Deze offerte is geldig tot [datum + 30 dagen]&quot;</li>
            <li>&quot;Prijzen zijn gebaseerd op huidige materiaalkosten&quot;</li>
            <li>&quot;Bij acceptatie na deze datum kunnen prijzen worden aangepast&quot;</li>
          </ul>

          <h2>Fout #4: Geen follow-up na verzending</h2>
          <p>
            <strong>De fout:</strong> Je stuurt de offerte en wacht af tot de klant belt.
          </p>
          <p>
            <strong>Waarom dit fout gaat:</strong> 70% van de klanten heeft vragen maar belt niet. 
            Ze kiezen uiteindelijk voor een concurrent die wel contact opneemt.
          </p>
          <p>
            <strong>De oplossing:</strong> Plan je follow-up:
          </p>
          <ul>
            <li>Dag 2: &quot;Heeft u de offerte ontvangen?&quot;</li>
            <li>Dag 7: &quot;Heeft u nog vragen over de werkzaamheden?&quot;</li>
            <li>Dag 14: &quot;Kunnen we een afspraak maken om details door te nemen?&quot;</li>
          </ul>

          <h2>Fout #5: Handmatig offertes maken (tijdverspilling)</h2>
          <p>
            <strong>De fout:</strong> Je maakt elke offerte vanaf nul in Word of Excel.
          </p>
          <p>
            <strong>Waarom dit fout gaat:</strong> Je verspilt 3-5 uur per offerte aan administratie 
            in plaats van aan het werken aan projecten. Bovendien maak je rekenfoutjes.
          </p>
          <p>
            <strong>De oplossing:</strong> Gebruik moderne tools:
          </p>
          <ul>
            <li>Automatische prijsberekening</li>
            <li>Professionele templates</li>
            <li>Herbruikbare werkzaamheden</li>
            <li>Directe verzending naar klant</li>
          </ul>

          <h2>De Impact van Deze Fouten</h2>
          <p>
            Een bouwer die deze 5 fouten maakt, verliest gemiddeld:
          </p>
          <ul>
            <li><strong>3 opdrachten per maand</strong> door slechte offertes</li>
            <li><strong>15 uur per week</strong> aan administratie</li>
            <li><strong>€2.000 per maand</strong> aan gemiste omzet</li>
          </ul>

          <h2>Hoe ARCHON.AI Deze Problemen Oplost</h2>
          <p>
            Onze AI-software helpt je alle 5 fouten te voorkomen:
          </p>
          <ul>
            <li>✅ Automatisch gedetailleerde omschrijvingen</li>
            <li>✅ Realistische prijsberekening op basis van marktdata</li>
            <li>✅ Automatische geldigheidsdatum en voorwaarden</li>
            <li>✅ Ingebouwde follow-up reminders</li>
            <li>✅ Professionele offertes in 2 minuten</li>
          </ul>

          <h2>Conclusie</h2>
          <p>
            Deze 5 fouten zijn makkelijk te voorkomen als je weet waar je op moet letten. 
            Door specifiek te zijn, realistische prijzen te hanteren, deadlines te stellen, 
            op te volgen en moderne tools te gebruiken, win je meer opdrachten en bespaar 
            je tijd.
          </p>

          <div className="bg-primary/10 p-6 rounded-lg mt-8">
            <h3 className="text-lg font-semibold mb-2">
              Stop met deze fouten maken
            </h3>
            <p className="mb-4">
              Probeer ARCHON.AI gratis en maak foutloze offertes in 2 minuten.
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