import React, { ReactNode, createContext, useContext, useState } from "react";

import { TranslatorDto } from "@/dto/translatorDto";

interface TranslatorContextType {
  translators: TranslatorDto[];
  translator: TranslatorDto | undefined;
  setTranslators: React.Dispatch<React.SetStateAction<TranslatorDto[]>>;
  setTranslator: React.Dispatch<
    React.SetStateAction<TranslatorDto | undefined>
  >;
}

const TranslatorContext = createContext<TranslatorContextType | undefined>(
  undefined,
);

export const TranslatorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [translators, setTranslators] = useState<TranslatorDto[]>([]);
  const [translator, setTranslator] = useState<TranslatorDto>();

  return (
    <TranslatorContext.Provider
      value={{ translators, translator, setTranslators, setTranslator }}
    >
      {children}
    </TranslatorContext.Provider>
  );
};

export const useTranslator = () => {
  const context = useContext(TranslatorContext);

  if (context === undefined) {
    throw new Error(
      "useTranslator deve ser usado dentro de um TranslatorProvider",
    );
  }

  return context;
};
