import usePaginatedApi from "@/service/usePaginatedApi";
import formatDate from "@/utils/DateUtils";
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
import {
  DotsThreeVertical,
  ListMagnifyingGlass,
  PencilLine,
  Trash,
} from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import { ConfirmationModal } from "./confirmationModal";
import HeaderTable from "./headerTable";
import PaginationControl from "./paginationControl";

export interface ColumProps {
  key: string;
  label: string;
}

interface GenericTableProps {
  endpoint: string;
  ModalComponent: React.ComponentType<any>;
  setItens: React.Dispatch<React.SetStateAction<any[]>>;
  itemsTitle: string;
  items: any[];
  columns: ColumProps[];
  itemName: string;
  deleteItem?(id: number): Promise<void>;
}

export default function GenericTable({
  endpoint,
  ModalComponent,
  setItens,
  itemsTitle,
  items,
  columns,
  itemName,
  deleteItem,
}: GenericTableProps) {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [limitPages, setLimitPages] = useState(10);

  const { data, pages, loadingState } = usePaginatedApi({
    page,
    limit: limitPages,
    endpoint: endpoint,
    searchTerm,
  });

  useEffect(() => {
    if (data) setItens(data.content);
  }, [data]);

  const truncateContent = (text: string) => {
    if (text.length > 100) {
      return `${text.slice(0, 100)}...`;
    }
    return text;
  };


  return (
    <div className="space-y-4">
      <HeaderTable
        ModalComponent={ModalComponent}
        itemName={itemName}
        itemsTitle={itemsTitle}
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
          items={items}
          loadingContent={<Spinner className="pt-[3rem]" />}
          loadingState={loadingState as any}
        >
          {(item: any) => (
            <TableRow key={item.id}>
              {columns.map((column) => {
                if (column.key === "actions") {
                  return (
                    <TableCell key={column.key}>
                      <Actions
                        ModalComponent={ModalComponent}
                        deleteItem={deleteItem}
                        item={item}
                        itemName={itemName}
                        setItens={setItens}
                      />
                    </TableCell>
                  );
                } else if (column.key === "createdAt") {
                  return (
                    <TableCell key={column.key}>
                      {formatDate(item[column.key])}
                    </TableCell>
                  );
                } else {
                  return (
                    <TableCell className="whitespace-nowrap" key={column.key}>{truncateContent(item[column.key])}</TableCell>
                  );
                }
              })}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

const Actions = ({
  item,
  ModalComponent,
  itemName,
  deleteItem,
  setItens,
}: {
  item: any;
  ModalComponent: React.ComponentType<any>;
  itemName: string;
  deleteItem?(id: number): Promise<void>;
  setItens: React.Dispatch<React.SetStateAction<any[]>>;
  generatePDF?: boolean;
}) => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isInformationsModal, setIsOpenInformationsModal] = useState(false);

  const handleDelete = async () => {
    try {
      if (item && deleteItem) {
        await deleteItem(item.id);
        setItens((data) => data.filter((data) => data.id !== item.id));
      }
    } catch (error) {
      console.error(
        `Erro ao deletar o ${itemName.toLocaleLowerCase()}:`,
        error,
      );
      // Implementar notificação de erro para o usuário
    }
  };

  return (
    <>
      <ActionsDropdown
        onDelete={deleteItem ? () => setIsConfirmationOpen(true) : undefined}
        onEdit={deleteItem ? () => setIsOpenEditModal(true) : undefined}
        onInformations={() => setIsOpenInformationsModal(true)}
      />
      {isInformationsModal && (
        <ModalComponent
          isOpen={isInformationsModal}
          item={item}
          moreDetails={isInformationsModal}
          onClose={() => setIsOpenInformationsModal(false)}
        />
      )}
      {isOpenEditModal && (
        <ModalComponent
          isOpen={isOpenEditModal}
          item={item}
          onClose={() => setIsOpenEditModal(false)}
        />
      )}
      {isConfirmationOpen && (
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          message={`Tem certeza que deseja remover ${itemName.toLocaleLowerCase()}?`}
          title="Confirmação"
          onClose={() => setIsConfirmationOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </>
  );
};

const ActionsDropdown = ({
  onEdit,
  onDelete,
  onInformations,
}: {
  onEdit?: () => void;
  onDelete?: () => void;
  onInformations: () => void;
}) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light">
          <DotsThreeVertical size={42} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem onPress={onInformations}>
          <div className="flex gap-1 items-center">
            <ListMagnifyingGlass size={20} />
            Informações
          </div>
        </DropdownItem>
        <DropdownItem isDisabled={!onEdit} onPress={onEdit}>
          <div className="flex gap-1 items-center">
            <PencilLine size={20} />
            Editar
          </div>
        </DropdownItem>
        <DropdownItem color="danger" isDisabled={!onDelete} onPress={onDelete}>
          <div className="flex gap-1 items-center">
            <Trash size={20} />
            Remover
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
