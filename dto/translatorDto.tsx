export interface TranslatorDto {
  id: number;
  name: string;
  email: string;
  sourceLanguage: string;
  targetLanguage: string;
  createdAt: string;
}

export interface CreateTranslatorDto {
  name: string;
  email: string;
  sourceLanguage: string;
  targetLanguage: string;
}

export interface PageableTranslatorsDto {
  totalPages: number;
  totalElements: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  content: TranslatorDto[];
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
