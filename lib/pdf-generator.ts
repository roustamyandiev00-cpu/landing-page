// PDF Generator voor offertes en facturen
// Gebruikt browser-native PDF generatie

export interface OfferteData {
  offerteNummer: string
  datum: string
  geldigTot: string
  klant: {
    naam: string
    email?: string
    adres?: string
    postcode?: string
    plaats?: string
  }
  bedrijf: {
    naam: string
    adres?: string
    postcode?: string
    plaats?: string
    telefoon?: string
    email?: string
    kvk?: string
    btw?: string
    iban?: string
  }
  items: {
    description: string
    quantity: number
    unit: string
    unitPrice: number
    btw: number
  }[]
  opmerkingen?: string
  voorwaarden?: string
}

export interface FactuurData {
  factuurNummer: string
  datum: string
  vervaldatum: string
  klant: {
    naam: string
    email?: string
    adres?: string
    postcode?: string
    plaats?: string
  }
  bedrijf: {
    naam: string
    adres?: string
    postcode?: string
    plaats?: string
    telefoon?: string
    email?: string
    kvk?: string
    btw?: string
    iban?: string
  }
  items: {
    description: string
    quantity: number
    unit: string
    unitPrice: number
    btw: number
  }[]
  opmerkingen?: string
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(amount)
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("nl-NL", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}

function getUnitLabel(unit: string): string {
  const labels: Record<string, string> = {
    stuk: "stuk",
    m2: "m²",
    m: "m",
    uur: "uur",
    dag: "dag",
    forfait: "forfait",
  }
  return labels[unit] || unit
}

function calculateTotals(items: { quantity: number; unitPrice: number; btw: number }[]) {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  
  const btwGroups: Record<number, number> = {}
  items.forEach(item => {
    const lineTotal = item.quantity * item.unitPrice
    const btwAmount = (lineTotal * item.btw) / 100
    btwGroups[item.btw] = (btwGroups[item.btw] || 0) + btwAmount
  })
  
  const totalBtw = Object.values(btwGroups).reduce((sum, val) => sum + val, 0)
  const total = subtotal + totalBtw
  
  return { subtotal, btwGroups, totalBtw, total }
}

export function generateOfferteHTML(data: OfferteData): string {
  const { subtotal, btwGroups, totalBtw, total } = calculateTotals(data.items)
  
  const itemsHTML = data.items.map((item, index) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${index + 1}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.description}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity} ${getUnitLabel(item.unit)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatCurrency(item.unitPrice)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.btw}%</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 500;">${formatCurrency(item.quantity * item.unitPrice)}</td>
    </tr>
  `).join("")

  const btwHTML = Object.entries(btwGroups).map(([percentage, amount]) => `
    <tr>
      <td style="padding: 8px 0; color: #6b7280;">BTW ${percentage}%</td>
      <td style="padding: 8px 0; text-align: right;">${formatCurrency(amount)}</td>
    </tr>
  `).join("")

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Offerte ${data.offerteNummer}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; line-height: 1.5; }
    @media print {
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body style="padding: 40px; max-width: 800px; margin: 0 auto; background: white;">
  
  <!-- Header -->
  <div style="display: flex; justify-content: space-between; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #3b82f6;">
    <div>
      <h1 style="font-size: 28px; font-weight: 700; color: #3b82f6; margin-bottom: 4px;">${data.bedrijf.naam}</h1>
      ${data.bedrijf.adres ? `<p style="color: #6b7280; font-size: 14px;">${data.bedrijf.adres}</p>` : ""}
      ${data.bedrijf.postcode && data.bedrijf.plaats ? `<p style="color: #6b7280; font-size: 14px;">${data.bedrijf.postcode} ${data.bedrijf.plaats}</p>` : ""}
      ${data.bedrijf.telefoon ? `<p style="color: #6b7280; font-size: 14px;">Tel: ${data.bedrijf.telefoon}</p>` : ""}
      ${data.bedrijf.email ? `<p style="color: #6b7280; font-size: 14px;">${data.bedrijf.email}</p>` : ""}
    </div>
    <div style="text-align: right;">
      <h2 style="font-size: 32px; font-weight: 700; color: #1f2937; margin-bottom: 8px;">OFFERTE</h2>
      <p style="font-size: 18px; color: #3b82f6; font-weight: 600;">${data.offerteNummer}</p>
    </div>
  </div>

  <!-- Info Grid -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
    <div>
      <h3 style="font-size: 12px; text-transform: uppercase; color: #6b7280; margin-bottom: 8px; letter-spacing: 0.5px;">Aan</h3>
      <p style="font-size: 18px; font-weight: 600; color: #1f2937;">${data.klant.naam}</p>
      ${data.klant.adres ? `<p style="color: #4b5563;">${data.klant.adres}</p>` : ""}
      ${data.klant.postcode && data.klant.plaats ? `<p style="color: #4b5563;">${data.klant.postcode} ${data.klant.plaats}</p>` : ""}
      ${data.klant.email ? `<p style="color: #4b5563;">${data.klant.email}</p>` : ""}
    </div>
    <div style="text-align: right;">
      <div style="margin-bottom: 12px;">
        <span style="color: #6b7280; font-size: 14px;">Datum:</span>
        <span style="font-weight: 500; margin-left: 8px;">${formatDate(data.datum)}</span>
      </div>
      <div>
        <span style="color: #6b7280; font-size: 14px;">Geldig tot:</span>
        <span style="font-weight: 500; margin-left: 8px;">${formatDate(data.geldigTot)}</span>
      </div>
    </div>
  </div>

  <!-- Items Table -->
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
    <thead>
      <tr style="background: #f3f4f6;">
        <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280; width: 40px;">#</th>
        <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280;">Omschrijving</th>
        <th style="padding: 12px; text-align: center; font-size: 12px; text-transform: uppercase; color: #6b7280; width: 100px;">Aantal</th>
        <th style="padding: 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #6b7280; width: 100px;">Prijs</th>
        <th style="padding: 12px; text-align: center; font-size: 12px; text-transform: uppercase; color: #6b7280; width: 60px;">BTW</th>
        <th style="padding: 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #6b7280; width: 120px;">Totaal</th>
      </tr>
    </thead>
    <tbody>
      ${itemsHTML}
    </tbody>
  </table>

  <!-- Totals -->
  <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
    <div style="width: 280px;">
      <table style="width: 100%;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Subtotaal</td>
          <td style="padding: 8px 0; text-align: right;">${formatCurrency(subtotal)}</td>
        </tr>
        ${btwHTML}
        <tr style="border-top: 2px solid #1f2937;">
          <td style="padding: 12px 0; font-size: 18px; font-weight: 700;">Totaal</td>
          <td style="padding: 12px 0; text-align: right; font-size: 18px; font-weight: 700; color: #3b82f6;">${formatCurrency(total)}</td>
        </tr>
      </table>
    </div>
  </div>

  <!-- Notes -->
  ${data.opmerkingen ? `
  <div style="margin-bottom: 30px; padding: 20px; background: #f9fafb; border-radius: 8px;">
    <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">Opmerkingen</h3>
    <p style="color: #4b5563; white-space: pre-wrap;">${data.opmerkingen}</p>
  </div>
  ` : ""}

  <!-- Terms -->
  <div style="padding: 20px; background: #eff6ff; border-radius: 8px; margin-bottom: 30px;">
    <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #1e40af;">Voorwaarden</h3>
    <p style="color: #3b82f6; font-size: 14px;">
      ${data.voorwaarden || "Deze offerte is geldig tot bovengenoemde datum. Prijzen zijn exclusief BTW tenzij anders vermeld. Na akkoord ontvangt u een opdrachtbevestiging."}
    </p>
  </div>

  <!-- Footer -->
  <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
    ${data.bedrijf.kvk ? `<span>KVK: ${data.bedrijf.kvk}</span> · ` : ""}
    ${data.bedrijf.btw ? `<span>BTW: ${data.bedrijf.btw}</span> · ` : ""}
    ${data.bedrijf.iban ? `<span>IBAN: ${data.bedrijf.iban}</span>` : ""}
  </div>

  <!-- Print Button (hidden when printing) -->
  <div class="no-print" style="margin-top: 40px; text-align: center;">
    <button onclick="window.print()" style="background: #3b82f6; color: white; border: none; padding: 12px 32px; border-radius: 8px; font-size: 16px; font-weight: 500; cursor: pointer;">
      Download PDF
    </button>
  </div>

</body>
</html>
  `
}

export function generateFactuurHTML(data: FactuurData): string {
  const { subtotal, btwGroups, totalBtw, total } = calculateTotals(data.items)
  
  const itemsHTML = data.items.map((item, index) => `
    <tr>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${index + 1}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.description}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity} ${getUnitLabel(item.unit)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">${formatCurrency(item.unitPrice)}</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.btw}%</td>
      <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right; font-weight: 500;">${formatCurrency(item.quantity * item.unitPrice)}</td>
    </tr>
  `).join("")

  const btwHTML = Object.entries(btwGroups).map(([percentage, amount]) => `
    <tr>
      <td style="padding: 8px 0; color: #6b7280;">BTW ${percentage}%</td>
      <td style="padding: 8px 0; text-align: right;">${formatCurrency(amount)}</td>
    </tr>
  `).join("")

  return `
<!DOCTYPE html>
<html lang="nl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Factuur ${data.factuurNummer}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1f2937; line-height: 1.5; }
    @media print {
      body { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body style="padding: 40px; max-width: 800px; margin: 0 auto; background: white;">
  
  <!-- Header -->
  <div style="display: flex; justify-content: space-between; margin-bottom: 40px; padding-bottom: 20px; border-bottom: 2px solid #10b981;">
    <div>
      <h1 style="font-size: 28px; font-weight: 700; color: #10b981; margin-bottom: 4px;">${data.bedrijf.naam}</h1>
      ${data.bedrijf.adres ? `<p style="color: #6b7280; font-size: 14px;">${data.bedrijf.adres}</p>` : ""}
      ${data.bedrijf.postcode && data.bedrijf.plaats ? `<p style="color: #6b7280; font-size: 14px;">${data.bedrijf.postcode} ${data.bedrijf.plaats}</p>` : ""}
      ${data.bedrijf.telefoon ? `<p style="color: #6b7280; font-size: 14px;">Tel: ${data.bedrijf.telefoon}</p>` : ""}
      ${data.bedrijf.email ? `<p style="color: #6b7280; font-size: 14px;">${data.bedrijf.email}</p>` : ""}
    </div>
    <div style="text-align: right;">
      <h2 style="font-size: 32px; font-weight: 700; color: #1f2937; margin-bottom: 8px;">FACTUUR</h2>
      <p style="font-size: 18px; color: #10b981; font-weight: 600;">${data.factuurNummer}</p>
    </div>
  </div>

  <!-- Info Grid -->
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-bottom: 40px;">
    <div>
      <h3 style="font-size: 12px; text-transform: uppercase; color: #6b7280; margin-bottom: 8px; letter-spacing: 0.5px;">Factuur aan</h3>
      <p style="font-size: 18px; font-weight: 600; color: #1f2937;">${data.klant.naam}</p>
      ${data.klant.adres ? `<p style="color: #4b5563;">${data.klant.adres}</p>` : ""}
      ${data.klant.postcode && data.klant.plaats ? `<p style="color: #4b5563;">${data.klant.postcode} ${data.klant.plaats}</p>` : ""}
      ${data.klant.email ? `<p style="color: #4b5563;">${data.klant.email}</p>` : ""}
    </div>
    <div style="text-align: right;">
      <div style="margin-bottom: 12px;">
        <span style="color: #6b7280; font-size: 14px;">Factuurdatum:</span>
        <span style="font-weight: 500; margin-left: 8px;">${formatDate(data.datum)}</span>
      </div>
      <div style="padding: 8px 16px; background: #fef3c7; border-radius: 6px; display: inline-block;">
        <span style="color: #92400e; font-size: 14px;">Vervaldatum:</span>
        <span style="font-weight: 600; margin-left: 8px; color: #92400e;">${formatDate(data.vervaldatum)}</span>
      </div>
    </div>
  </div>

  <!-- Items Table -->
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
    <thead>
      <tr style="background: #f3f4f6;">
        <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280; width: 40px;">#</th>
        <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #6b7280;">Omschrijving</th>
        <th style="padding: 12px; text-align: center; font-size: 12px; text-transform: uppercase; color: #6b7280; width: 100px;">Aantal</th>
        <th style="padding: 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #6b7280; width: 100px;">Prijs</th>
        <th style="padding: 12px; text-align: center; font-size: 12px; text-transform: uppercase; color: #6b7280; width: 60px;">BTW</th>
        <th style="padding: 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #6b7280; width: 120px;">Totaal</th>
      </tr>
    </thead>
    <tbody>
      ${itemsHTML}
    </tbody>
  </table>

  <!-- Totals -->
  <div style="display: flex; justify-content: flex-end; margin-bottom: 40px;">
    <div style="width: 280px;">
      <table style="width: 100%;">
        <tr>
          <td style="padding: 8px 0; color: #6b7280;">Subtotaal</td>
          <td style="padding: 8px 0; text-align: right;">${formatCurrency(subtotal)}</td>
        </tr>
        ${btwHTML}
        <tr style="border-top: 2px solid #1f2937;">
          <td style="padding: 12px 0; font-size: 18px; font-weight: 700;">Te betalen</td>
          <td style="padding: 12px 0; text-align: right; font-size: 18px; font-weight: 700; color: #10b981;">${formatCurrency(total)}</td>
        </tr>
      </table>
    </div>
  </div>

  <!-- Payment Info -->
  <div style="padding: 20px; background: #ecfdf5; border-radius: 8px; margin-bottom: 30px;">
    <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 12px; color: #065f46;">Betalingsgegevens</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; color: #047857; font-size: 14px;">
      ${data.bedrijf.iban ? `
      <div>
        <span style="color: #6b7280;">IBAN:</span>
        <span style="font-weight: 600; margin-left: 8px;">${data.bedrijf.iban}</span>
      </div>
      ` : ""}
      <div>
        <span style="color: #6b7280;">Onder vermelding van:</span>
        <span style="font-weight: 600; margin-left: 8px;">${data.factuurNummer}</span>
      </div>
    </div>
  </div>

  <!-- Notes -->
  ${data.opmerkingen ? `
  <div style="margin-bottom: 30px; padding: 20px; background: #f9fafb; border-radius: 8px;">
    <h3 style="font-size: 14px; font-weight: 600; margin-bottom: 8px;">Opmerkingen</h3>
    <p style="color: #4b5563; white-space: pre-wrap;">${data.opmerkingen}</p>
  </div>
  ` : ""}

  <!-- Footer -->
  <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #9ca3af; font-size: 12px;">
    ${data.bedrijf.kvk ? `<span>KVK: ${data.bedrijf.kvk}</span> · ` : ""}
    ${data.bedrijf.btw ? `<span>BTW: ${data.bedrijf.btw}</span>` : ""}
  </div>

  <!-- Print Button (hidden when printing) -->
  <div class="no-print" style="margin-top: 40px; text-align: center;">
    <button onclick="window.print()" style="background: #10b981; color: white; border: none; padding: 12px 32px; border-radius: 8px; font-size: 16px; font-weight: 500; cursor: pointer;">
      Download PDF
    </button>
  </div>

</body>
</html>
  `
}

// Open PDF in new window for printing/saving
export function openPDFPreview(html: string) {
  const printWindow = window.open("", "_blank")
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
  }
}
