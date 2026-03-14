import { LlmAgent, InMemoryRunner, stringifyContent } from '@google/adk';
import { logAgentAction } from '@/utils/logger';
import { islemZatenIslendi, islemKayitla } from '@/lib/idempotency';
import { ajanMesajGonder } from '@/agents/AgentBus';
import { kuyruktanAl, islemBaslat, islemTamamla, islemHata } from '@/lib/islemKuyrugu';
import { deadLetterKaydet } from '@/lib/alertLogger';
// Tüm Ajanları İçe Aktarma (Modüler)
import { theCloserAgent } from './TheCloserAgent';
import { churnDetectiveAgent } from './ChurnDetectiveAgent';
import { leadMadencisiAgent } from './LeadMadencisiAgent';
import { derinArastirmaciAgent } from './DerinArastirmaciAgent';
import { mesajMimariAgent } from './MesajMimariAgent';
import { telefonKomutaniAgent } from './TelefonKomutaniAgent';
import { muzakereciAgent } from './MuzakereciAgent';
import { theCreatorAgent } from './TheCreatorAgent';
import { destekUpsellAgent } from './DestekUpsellAgent';
import { degisiklikAjaniAgent } from './DegisiklikAjaniAgent';
import { operasyonBeyniAgent } from './OperasyonBeyniAgent';
import { theOverseerAgent } from './TheOverseerAgent';
import { sentimentGuardianAgent } from './SentimentGuardianAgent';
import { esnafAsistaniAgent } from './EsnafAsistaniAgent';
import { reklamAsistaniAgent } from './ReklamAsistaniAgent';
import { ikAjaniAgent } from './IKAjaniAgent';
import { satinalmaAjaniAgent } from './SatinalmaAjani';

export const orchestratorAgent = new LlmAgent({
  name: 'OrchestratorAgent',
  model: 'gemini-2.5-flash',
  description: 'kepenk.ai için merkezi ajan orkestratörü — kullanıcı niyetlerini analiz eder ve doğru ajana yönlendirir.',
  instruction: `
    Sen kepenk.ai'nin orkestra şefisin. Gelen mesajı analiz eder, doğru ajana yönlendirirsin.

    AJAN KULLANIM KURALLARI:

    YENİ ESNAF (ödeme sonrası aktivasyon):
      1. TheCreatorAgent → ilk haftalık içerikleri üret
      2. SiteHakemi    → üretilen siteyi değerlendir
      3. EsnafAsistani → hoş geldin + bilgilendirme

    GÜNLÜK RUTIN:
      Sabah mesajı → EsnafAsistaniAgent
      Haftalık içerik → TheCreatorAgent

    KRİZ TETİKLEYİCİLERİ:
      4-yıldız yorum   → SentimentGuardian → TheCloser
      3-yıldız yorum   → SentimentGuardian → Muzakereci → admin bildirim
      Ödeme başarısız  → ChurnDetective → TheCloser

    ÇEVRİMDIŞI ESNAF (7+ gün login yok):
      → ChurnDetective → EsnafAsistani → DegisiklikAjani

    SATIŞ:
      Fiyat/paket sorusu → TheCloserAgent
      İtiraz/pahalı      → MuzakereciAgent

    DEĞİŞİKLİK: → DegisiklikAjani
    İÇERİK:     → TheCreatorAgent
    ŞIKAYET:    → DestekUpsellAgent
    LEAD:       → LeadMadencisi → DerinArastirmaci → MesajMimari
    DİĞER:      → EsnafAsistaniAgent
  `,
});

// Zekice Yönlendirme (Intent-Matching) Kuralları
const ROUTING_RULES = {
  satis: ["fiyat", "paket", "ücretsiz", "deneme", "ne kadar", "satın", "almak"],
  degisiklik: ["değiştir", "güncelle", "ekle", "sil", "kapat", "aç", "abonelik"],
  icerik: ["içerik", "paylaşım", "instagram", "yazı", "post", "facebook"],
  sikayet: ["memnun değil", "çalışmıyor", "sorun", "hata", "problem"],
  churn: ["bırakmak", "iptal", "pahalı", "işe yaramıyor", "vazgeç"],
  kriz: ["yorum", "şikayet", "olumsuz", "kötü", "1 yıldız", "2 yıldız"],
  lead: ["lead", "yeni müşteri", "bul", "araştır", "potansiyel"],
  satinalma: ["fiyatlar", "en ucuz", "toptancı", "sipariş ver", "malzeme al", "şampuan bul", "boya fiyatı"]
};

const ALL_AGENTS = [
  orchestratorAgent,
  theCloserAgent,
  churnDetectiveAgent,
  leadMadencisiAgent,
  derinArastirmaciAgent,
  mesajMimariAgent,
  telefonKomutaniAgent,
  muzakereciAgent,
  theCreatorAgent,
  destekUpsellAgent,
  degisiklikAjaniAgent,
  operasyonBeyniAgent,
  theOverseerAgent,
  sentimentGuardianAgent,
  esnafAsistaniAgent,
  reklamAsistaniAgent,
  ikAjaniAgent,
  satinalmaAjaniAgent
];

// A standard runner instance for our backend architecture
const runner = new InMemoryRunner({
  appName: 'kepenk.ai',
  agent: orchestratorAgent,
});

/**
 * Helper function to run the Orchestrator ADK agent
 * and return a unified string response.
 */
export async function runAdkOrchestrator(sessionId: string, userMessage: string, targetAgentName?: string): Promise<string> {
  const msgLower = userMessage.toLowerCase();

  // Intent Analysis based on User prompt keywords
  let detectedIntent = "genel";
  for (const [intent, keywords] of Object.entries(ROUTING_RULES)) {
    if (keywords.some(k => msgLower.includes(k))) {
      detectedIntent = intent;
      break;
    }
  }

  // Orchestrator logs intent
  logAgentAction({
    agentId: "OrchestratorAgent",
    actionType: "INTENT_DETECTED",
    description: `Intent detected: ${detectedIntent}`,
    metadata: { sessionId, message: userMessage, intent: detectedIntent, explicitAgent: targetAgentName }
  });

  // Optional overriding of agent handling based on static rules (simulating true Multi-Agent interaction)
  let activeAgent = orchestratorAgent;

  if (targetAgentName) {
    const explicitAgent = ALL_AGENTS.find(a => a.name === targetAgentName);
    if (explicitAgent) activeAgent = explicitAgent;
  } else {
    if (detectedIntent === "satis" || detectedIntent === "churn") {
      activeAgent = detectedIntent === "satis" ? theCloserAgent : churnDetectiveAgent;
    } else if (detectedIntent === "degisiklik") {
      activeAgent = degisiklikAjaniAgent;
    } else if (detectedIntent === "icerik") {
      activeAgent = theCreatorAgent;
    } else if (detectedIntent === "satinalma") {
      activeAgent = satinalmaAjaniAgent;
    }
  }

  // ADK executes the active targeted agent
  const dynamicRunner = new InMemoryRunner({ appName: 'kepenk.ai', agent: activeAgent });

  // 1. Initialize or get conversation session
  try {
    await dynamicRunner.sessionService.createSession({
      appName: 'kepenk.ai',
      userId: 'system_user',
      sessionId: sessionId,
    });
  } catch (e) {
    // Session might already exist, which is fine
  }

  const stream = dynamicRunner.runAsync({
    userId: 'system_user',
    sessionId: sessionId,
    newMessage: { role: 'user', parts: [{ text: userMessage }] }
  });

  let fullReply = '';
  // 3. Process events and collect the final response
  for await (const event of stream) {
    fullReply += stringifyContent(event);
  }

  // Log outcome 
  logAgentAction({
    agentId: activeAgent.name,
    actionType: "RESPONSE_GENERATED",
    description: "Agent generated a response",
    metadata: { sessionId, reply: fullReply }
  });
  return fullReply || "Üzgünüm, şu anda yanıt veremiyorum.";
}

// ═══════════════════════════════════════════════════════════════════════════
// WORKER — Kuyruk Tüketici (Asenkron İşlem)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Firestore `islem_kuyrugu`'ndan bekleyen işlemleri çeker ve işler.
 * Cron veya background trigger ile çağrılır.
 * 
 * Akış:
 *   1. Kuyruktan al (max 5)
 *   2. Her işlem için idempotency kontrol
 *   3. agent_bus tipi → AgentBus ile dispatch
 *   4. whatsapp/instagram → runAdkOrchestrator
 *   5. Hata → DLQ'ya kaydet
 */
export async function kuyrukTuket(limit = 5): Promise<{
  islenen: number
  toplam: number
  hatali: number
}> {
  const islemler = await kuyruktanAl(limit)

  if (islemler.length === 0) {
    return { islenen: 0, toplam: 0, hatali: 0 }
  }

  let islenen = 0
  let hatali = 0

  for (const { id, data } of islemler) {
    // ── Atomik claim ────────────────────────────────────────────────────
    const baslatildi = await islemBaslat(id)
    if (!baslatildi) continue

    // ── Idempotency kontrolü ────────────────────────────────────────────
    const zatenIslendi = await islemZatenIslendi(id, 'genel')
    if (zatenIslendi) {
      await islemTamamla(id, 'idempotency_skip')
      continue
    }

    try {
      let sonuc: string

      if (data.tip === 'agent_bus' as any) {
        // ── AgentBus dispatch (RAM üzerinden) ───────────────────────────
        const payload = data.payload as any
        const hedefAjan = payload.hedefAjan || 'esnaf_asistani'
        const kaynakAjan = payload.kaynakAjan || 'orchestrator'
        const ajanPayload = payload.mesaj ? JSON.parse(payload.mesaj) : {}
        const ajanContext = payload.context ? JSON.parse(payload.context) : {}

        const busSonuc = await ajanMesajGonder(
          kaynakAjan,
          hedefAjan,
          ajanPayload,
          ajanContext
        )

        sonuc = busSonuc.basarili
          ? JSON.stringify(busSonuc.cikti).slice(0, 2000)
          : `HATA: ${busSonuc.hata}`

      } else {
        // ── WhatsApp / Instagram / Diğer → ADK Orchestrator ─────────────
        const sessionId = data.payload.sessionId || `worker_${id}`
        const mesaj = data.payload.mesaj || data.payload.context || ''

        sonuc = await runAdkOrchestrator(sessionId, mesaj)
      }

      await islemTamamla(id, sonuc)

      // Idempotency kayıt
      await islemKayitla(id, 'genel', { sonuc: sonuc.slice(0, 500) })

      islenen++
    } catch (error: any) {
      hatali++
      console.error(`[ORCHESTRATOR WORKER] ❌ İşlem ${id}:`, error.message)
      await islemHata(id, error.message)

      // Max 3 denemede başarısız → DLQ
      if ((data.denemeSayisi || 0) >= 2) {
        await deadLetterKaydet({
          islem: `kuyruk_${data.tip}`,
          kaynak: 'OrchestratorAgent.kuyrukTuket',
          payload: { kuyrukId: id, ...data.payload },
          hata: error.message,
          hataSinifi: error.name || 'WorkerError',
          denemeSayisi: (data.denemeSayisi || 0) + 1,
          oncelik: 'kritik',
        })
      }
    }
  }

  return { islenen, toplam: islemler.length, hatali }
}
