import { DocumentDto } from "./documentDto";
import { ImportErrorDto } from "./importErrorDto";

export interface DocumentImportDto {
  id: number;
  fileName: string;
  message: string;
  importErrors: ImportErrorDto[];
  documents: DocumentDto[];
  createdAt: string;
}

export interface CreateDocumentImportDto {
  name: string;
  email: string;
  sourceLanguage: string;
  targetLanguage: string;
}
