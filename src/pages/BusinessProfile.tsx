import { KeyRound, ShieldAlert, LogOut, Trash2, XCircle } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Button from '@/components/Button'
import Reveal from '@/components/Reveal'
import { useI18n } from '@/i18n'

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line/60 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm text-fog">{label}</span>
      <span className="font-mono text-sm text-frost">{value}</span>
    </div>
  )
}

export default function BusinessProfile() {
  const { t } = useI18n()

  return (
    <>
      <PageHero
        eyebrow={t.businessProfile.hero.eyebrow}
        title={
          <>
            {t.businessProfile.hero.titleLead}
            <span className="text-gradient">{t.businessProfile.hero.titleHighlight}</span>
            {t.businessProfile.hero.titleEnd}
          </>
        }
        description={t.businessProfile.hero.description}
      />

      <section className="mx-auto max-w-4xl px-5 pb-24 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="panel h-full p-7">
              <h2 className="font-display text-lg font-semibold">{t.businessProfile.account}</h2>
              <div className="mt-4">
                <Row label={t.businessProfile.company} value="Entropic Defence AB" />
                <Row label={t.businessProfile.orgNumber} value="559999-9999" />
                <Row label={t.businessProfile.contactPerson} value="—" />
                <Row label={t.businessProfile.email} value="—" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="panel h-full p-7">
              <h2 className="font-display text-lg font-semibold">
                {t.businessProfile.subscription}
              </h2>
              <p className="mt-3 font-display text-2xl font-bold">
                {t.businessProfile.subscriptionName}
                <span className="ml-3 rounded-full bg-mint/15 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.15em] text-mint">
                  {t.common.active}
                </span>
              </p>
              <p className="mt-2 text-sm text-fog">{t.businessProfile.nextInvoice}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="ghost" disabled>
                  {t.businessProfile.managePayment}
                </Button>
                <Button variant="ghost" disabled>
                  {t.businessProfile.upgradePackage}
                </Button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="panel p-7">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <KeyRound className="h-5 w-5 text-signal" aria-hidden="true" />
                {t.businessProfile.pgpRecipients}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-fog">{t.businessProfile.pgpText}</p>
              <div className="mt-5 space-y-2">
                <Row label={t.businessProfile.itResponsible} value="—" />
                <Row label={t.businessProfile.pgpKey} value={t.businessProfile.noKeyAdded} />
              </div>
              <Button variant="ghost" className="mt-5" disabled>
                {t.businessProfile.addRecipient}
              </Button>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="panel p-7">
              <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
                <ShieldAlert className="h-5 w-5 text-danger" aria-hidden="true" />
                {t.businessProfile.accountActions}
              </h2>
              <div className="mt-5 space-y-3">
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center justify-between rounded-lg border border-line px-4 py-3 text-sm text-fog transition-colors disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <XCircle className="h-4 w-4" aria-hidden="true" />
                    {t.businessProfile.pauseSubscription}
                  </span>
                </button>
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center justify-between rounded-lg border border-line px-4 py-3 text-sm text-fog transition-colors disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    {t.businessProfile.deleteAccount}
                  </span>
                </button>
                <button
                  type="button"
                  disabled
                  className="flex w-full items-center justify-between rounded-lg border border-line px-4 py-3 text-sm text-fog transition-colors disabled:opacity-50"
                >
                  <span className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" aria-hidden="true" />
                    {t.businessProfile.logout}
                  </span>
                </button>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-fog">{t.businessProfile.phaseBNote}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
