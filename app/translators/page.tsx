"use client";

import {
  ModalTranslator,
  ModalTranslatorProps,
} from "@/components/specifics/modalTranslator";
import GenericTable from "@/components/ui/genericTable";
import { useTranslator } from "@/contexts/translatorContext";
import { deleteTranslator } from "@/service/translatorService";

export default function TranslatorsPage() {
  const { translators, setTranslators } = useTranslator();

  const renderModalComponent = (props: ModalTranslatorProps) => (
    <ModalTranslator {...props} />
  );

  const columns = [
    { key: "name", label: "Nome" },
    { key: "email", label: "E-mail" },
    { key: "sourceLanguage", label: "Idioma de origem" },
    { key: "targetLanguage", label: "Idioma destino" },
    { key: "createdAt", label: "Criado em" },
    { key: "actions", label: "Ações" },
  ];

  return (
    <main>
      <div>
        <GenericTable
          //dataName="content"
          ModalComponent={renderModalComponent}
          columns={columns}
          deleteItem={deleteTranslator}
          endpoint="translators"
          itemName="Tradutor"
          items={translators}
          itemsTitle="Tradutores"
          setItens={setTranslators}
        />
      </div>
    </main>
  );
}
