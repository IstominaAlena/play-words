import { PageTitle } from '@repo/ui/core/typography'
import { useTranslations } from 'next-intl';

export const UnderConstructionPage = () => {
  const tGlobal = useTranslations("global");
  return (
    <section className="flex flex-1 flex-col items-center justify-center overflow-hidden">
        <PageTitle className="normal-case">{tGlobal("under_construction")}</PageTitle>
    </section>
  )
}
