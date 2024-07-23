"use client";

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Spinner } from "@nextui-org/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { DotsThreeVertical, ListMagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

import ModalmportInfo from "@/components/specifics/modalImportInfo";
import ModalNewImport, {
  ModalImportProps,
} from "@/components/specifics/modalNewImport";
import HeaderTable from "@/components/ui/headerTable";
import PaginationControl from "@/components/ui/paginationControl";
import { useDocumentImport } from "@/contexts/importContext";
import { DocumentImportDto } from "@/dto/documentImportDto";
import usePaginatedApi from "@/service/usePaginatedApi";
import formatDate from "@/utils/DateUtils";

export default function ImportPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limitPages, setLimitPages] = useState(10);
  const { imports, setImports } = useDocumentImport();

  const renderModalComponent = (props: ModalImportProps) => (
    <ModalNewImport {...props} />
  );

  const columns = [
    { key: "fileName", label: "Arquivo" },
    { key: "message", label: "Mensagem" },
    { key: "importErrors", label: "Erros" },
    { key: "createdAt", label: "Criado em" },
    { key: "actions", label: "Ações" },
  ];

  const { data, pages, loadingState } = usePaginatedApi({
    page,
    limit: limitPages,
    endpoint: "documentImport",
    searchTerm,
  });

  useEffect(() => {
    if (data) setImports(data.content);
  }, [data]);

  return (
    <main>
      <div className="space-y-4">
        <HeaderTable
          ModalComponent={renderModalComponent}
          itemName="Importação"
          itemsTitle="Importações"
          limitPages={limitPages}
          searchTerm={searchTerm}
          setLimitPages={setLimitPages}
          setSearchTerm={setSearchTerm}
        />
        <Table
          bottomContent={
            pages > 0 && (
              <PaginationControl
                page={page}
                setPage={setPage}
                totalPages={pages}
              />
            )
          }
          selectionMode="single"
        >
          <TableHeader>
            {columns.map((column, index) => (
              <TableColumn key={index}>{column.label}</TableColumn>
            ))}
          </TableHeader>
          <TableBody
            emptyContent="Nenhum item encontrado"
            items={imports}
            loadingContent={<Spinner className="pt-[3rem]" />}
            loadingState={loadingState as any}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell className="whitespace-nowrap">{item.fileName}</TableCell>
                <TableCell>
                  <span className={`px-3 py-1 rounded-md whitespace-nowrap ${item.importErrors.length > 0 ? "bg-danger-100" : "bg-success-100"}`}>
                    {item.message}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`${item.importErrors.length > 0 ? "" : "hidden"}`}
                  >
                    {item.importErrors.length}
                  </span>
                </TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <Actions item={item} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}

const Actions = ({ item }: { item: DocumentImportDto }) => {
  const [isInformationsModal, setIsOpenInformationsModal] = useState(false);

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="sm" variant="light">
            <DotsThreeVertical size={42} />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onPress={() => setIsOpenInformationsModal(true)}>
            <div className="flex gap-1 items-center">
              <ListMagnifyingGlass size={20} />
              Informações do processo
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {isInformationsModal && (
        <ModalmportInfo
          isOpen={isInformationsModal}
          item={item}
          onClose={() => setIsOpenInformationsModal(false)}
        />
      )}
    </>
  );
};
