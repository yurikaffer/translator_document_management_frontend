import React, { ReactNode, createContext, useContext, useState } from "react";

import { DocumentImportDto } from "@/dto/documentImportDto";

interface DocumentImportContextType {
  imports: DocumentImportDto[];
  selectedImport: DocumentImportDto | undefined;
  setImports: React.Dispatch<React.SetStateAction<DocumentImportDto[]>>;
  setSelectedImport: React.Dispatch<
    React.SetStateAction<DocumentImportDto | undefined>
  >;
}

const DocumentImportContext = createContext<
  DocumentImportContextType | undefined
>(undefined);

export const DocumentImportProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [imports, setImports] = useState<DocumentImportDto[]>([]);
  const [selectedImport, setSelectedImport] = useState<DocumentImportDto>();

  return (
    <DocumentImportContext.Provider
      value={{ imports, selectedImport, setImports, setSelectedImport }}
    >
      {children}
    </DocumentImportContext.Provider>
  );
};

export const useDocumentImport = () => {
  const context = useContext(DocumentImportContext);

  if (context === undefined) {
    throw new Error(
      "useDocumentImport deve ser usado dentro de um DocumentImportProvider",
    );
  }

  return context;
};
