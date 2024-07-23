import { DocumentImportDto } from "./documentImportDto";
import { TranslatorDto } from "./translatorDto";

export interface DocumentDto {
  id: number;
  subject: string;
  content: string;
  location: string;
  author: string;
  translator: TranslatorDto;
  documentImport: DocumentImportDto;
  createdAt: string;
}

export interface CreateDocumentDto {
  subject: string;
  content: string;
  location: string;
  author: string;
  translator: TranslatorDto;
  documentImport?: DocumentImportDto;
}

export interface PageableDocumentsDto {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  content: DocumentDto[];
  number: number;
  sort: [
    {
      direction: string;
      nullHandling: string;
      ascending: boolean;
      property: string;
      ignoreCase: boolean;
    },
  ];
  pageable: {
    offset: number;
    sort: [
      {
        direction: string;
        nullHandling: string;
        ascending: boolean;
        property: string;
        ignoreCase: boolean;
      },
    ];
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  empty: boolean;
}
