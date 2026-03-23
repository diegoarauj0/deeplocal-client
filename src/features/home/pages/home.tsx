import { useAuthContext } from "../../auth/contexts/auth.context";
import { useTranslation } from "react-i18next";
import * as S from "./home.style";

const exampleImages = ["diego.png", "joao.png", "luna.png", "pedro.png"];
const repeatedExampleImages = [...exampleImages, ...exampleImages];

export function HomePage() {
  const { authenticated, currentUsername } = useAuthContext();
  const { t } = useTranslation("home");

  const ctaLabel = authenticated ? t("CTA_PROFILE") : t("CTA_CREATE");
  const ctaTarget = authenticated ? (currentUsername ? `/p/${currentUsername}` : "/profile") : "/auth/register";

  return (
    <S.Container>
      <S.Header>
        <S.Title>{t("TITLE")}</S.Title>
        <S.Description>{t("DESCRIPTION")}</S.Description>
      </S.Header>

      <S.ExamplesSection>
        <S.SectionTitle>{t("EXAMPLES_TITLE")}</S.SectionTitle>
        <S.ExampleDisclaimer>{t("DISCLAIMER")}</S.ExampleDisclaimer>
        <S.ExamplesWrapper>
          <S.ExamplesTrack>
            {repeatedExampleImages.map((image, index) => (
              <S.ExampleImage
                key={`${image}-${index}`}
                src={`/examples/${image}`}
                alt={`Exemplo de página ${(index % exampleImages.length) + 1}`}
                loading="lazy"
              />
            ))}
          </S.ExamplesTrack>
        </S.ExamplesWrapper>
      </S.ExamplesSection>

      <S.CTASection>
        <S.CTAButton to={ctaTarget}>{ctaLabel}</S.CTAButton>
        <S.CTAHelper>{t("CTA_HELPER")}</S.CTAHelper>
      </S.CTASection>
    </S.Container>
  );
}
