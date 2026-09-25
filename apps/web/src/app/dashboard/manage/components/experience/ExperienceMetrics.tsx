'use client'

import {
  deriveActionCardExperienceMetrics,
  type ActionCardOutcomeEvent,
  type ActionCardProtocol,
} from '@kepenk/action-card-schema'
import { derivePreviewDecisions } from '@/lib/experience/previewDecisions'
import { formatDecisionDuration } from '@/lib/experience/turkishPresentation'

interface ExperienceMetricsProps {
  cards: readonly ActionCardProtocol[]
  outcomes: readonly ActionCardOutcomeEvent[]
}

export default function ExperienceMetrics({ cards, outcomes }: ExperienceMetricsProps) {
  const metrics = deriveActionCardExperienceMetrics({ cards, outcomes })
  const decisions = derivePreviewDecisions(cards, outcomes)
  const timedCards = decisions.filter(row => row.durationMs !== null).length

  return (
    <details className="kpnk-card kpnk-preview-metrics">
      <summary>Bu denemedeki seçimlerin</summary>
      <div className="kpnk-preview-metric-grid">
        {[
          ['Gösterilen kart', metrics.cardsSurfaced],
          ['Yanıtlanan kart', metrics.cardsWithDecision],
          ['Seçilen işlem', metrics.actionSelections],
          ['Kapatılan kart', metrics.dismissals],
          ['Ertelenen kart', metrics.snoozes],
          ['Sayfa açma seçimi', metrics.navigationSelections],
          ['Ortanca karar süresi', formatDecisionDuration(metrics.medianTimeToDecisionMs)],
        ].map(([label, value]) => (
          <div key={String(label)}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <p className="kpnk-preview-metric-note">
        {timedCards > 0
          ? `Karar süresi, ilk seçimini yaptığın ${timedCards} kart üzerinden hesaplandı.`
          : 'Henüz karar süresi ölçülmedi. Bir kartta seçim yaptığında süresi burada görünecek.'}
      </p>
      {decisions.length > 0 ? (
        <table className="kpnk-preview-decisions">
          <caption>Kartlara göre ilk seçimin</caption>
          <thead><tr><th scope="col">İş</th><th scope="col">İlk seçimin</th><th scope="col">Karar süresi</th></tr></thead>
          <tbody>{decisions.map(row => (
            <tr key={row.cardId}>
              <th scope="row">{row.title}</th>
              <td>{row.firstChoice ?? 'Henüz seçim yapmadın'}</td>
              <td>{formatDecisionDuration(row.durationMs)}</td>
            </tr>
          ))}</tbody>
        </table>
      ) : null}
      <p className="kpnk-preview-metric-note">
        Süre, kartın ekrana eklenmesinden ilk işlem seçimine, kapatma veya erteleme kararına kadar geçen zamandır.
        Aynı karttaki sonraki seçimlerin bu süreyi değiştirmez. Sekme arka plandayken geçen zaman da dahildir; bu, çalışma süreni veya hızını ölçmez.
        Ortanca, süreler sıralandığında ortada kalan değerdir; iki orta değer varsa bunların ortalaması alınır.
      </p>
      <p className="kpnk-preview-metric-note">
        Şimdi ilgilen bölümündeki kartlar ve ayrıntısını açtığın işler birer kez sayılır.
        Ayrıntı açmak, işlem seçmek sayılmaz. Bu bilgiler bir işin tamamlandığını veya gelir elde edildiğini göstermez.
        Bilgiler kalıcı olarak kaydedilmez; başka bir yere gönderilmez.
        Denemeyi baştan başlatınca, görünümü değiştirince veya sayfayı yenileyince sıfırlanır.
      </p>
    </details>
  )
}
