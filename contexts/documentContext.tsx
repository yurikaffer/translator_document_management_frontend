import React, { ReactNode, createContext, useContext, useState } from "react";

import { DocumentDto } from "@/dto/documentDto";

interface DocumentContextType {
  documents: DocumentDto[];
  document: DocumentDto | undefined;
  setDocuments: React.Dispatch<React.SetStateAction<DocumentDto[]>>;
  setDocument: React.Dispatch<React.SetStateAction<DocumentDto | undefined>>;
}

const DocumentsContext = createContext<DocumentContextType | undefined>(
  undefined,
);

export const DocumentsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [documents, setDocuments] = useState<DocumentDto[]>([]);
  const [document, setDocument] = useState<DocumentDto>();

  return (
    <DocumentsContext.Provider
      value={{ documents, document, setDocuments, setDocument }}
    >
      {children}
    </DocumentsContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentsContext);

  if (context === undefined) {
    throw new Error(
      "useDocuments deve ser usado dentro de um DocumentsProvider",
    );
  }

  return context;
};
