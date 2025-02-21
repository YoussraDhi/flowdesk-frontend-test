import React from "react";
import { useTranslation, Trans } from "react-i18next";
import styled from "styled-components";
import Aurora from "@/blocks/Backgrounds/Aurora/Aurora";
import "@/App.css";

const PreformattedText = styled.div`
  white-space: pre-wrap; /* This will render new lines as actual line breaks */
`;

const About = () => {
  const { t } = useTranslation();

  return (
    <main>
      <Aurora colorStops={["#fca311", "#14213d", "#fca311"]} amplitude={0.6} />
      <h1>{t("about.title")}</h1>
      <div>
        <h2>{t("about.content.goals")}</h2>
        <p>{t("about.content.description")}</p>
        <h2>{t("about.content.specifications")}</h2>
        <PreformattedText>
          <Trans
            i18nKey="about.content.specificationsContent"
            components={[
              <br key="line-break" />,
              <a
                key="link"
                href={t("about.content.link")}
                target="_blank"
                rel="noopener noreferrer"
              />,
            ]}
          />
        </PreformattedText>
      </div>
    </main>
  );
};

export default About;
