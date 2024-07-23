"use client";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { useRouter } from "next/navigation";
import * as React from "react";

import { TranslatorProvider } from "@/contexts/translatorContext";
import { DocumentImportProvider } from "@/contexts/importContext";
import { DocumentsProvider } from "@/contexts/documentContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <DocumentsProvider>
        <TranslatorProvider>
          <DocumentImportProvider>
            <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
          </DocumentImportProvider>
        </TranslatorProvider>
      </DocumentsProvider>
    </NextUIProvider>
  );
}
