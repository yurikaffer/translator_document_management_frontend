"use client";
import {
  ModalDocument,
  ModalDocumentProps,
} from "@/components/specifics/modalDocument";
import GenericTable from "@/components/ui/genericTable";
import { useDocuments } from "@/contexts/documentContext";
import { deleteDocuments } from "@/service/documentService";

export default function DocumentsPage() {
  const { documents, setDocuments } = useDocuments();

  const renderModalComponent = (props: ModalDocumentProps) => (
    <ModalDocument {...props} />
  );

  const columns = [
    { key: "subject", label: "Assunto" },
    { key: "content", label: "Conteúdo" },
    { key: "location", label: "Localização" },
    { key: "createdAt", label: "Criado em" },
    { key: "actions", label: "Ações" },
  ];

  return (
    <main>
      <div>
        <GenericTable
          ModalComponent={renderModalComponent}
          columns={columns}
          deleteItem={deleteDocuments}
          endpoint="documents"
          itemName="Documento"
          items={documents}
          itemsTitle="Documentos"
          setItens={setDocuments}
        />
      </div>
    </main>
  );
}
