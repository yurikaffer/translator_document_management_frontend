import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import { DocumentImportDto } from "@/dto/documentImportDto";
import formatDate from "@/utils/DateUtils";

export interface ModalmportInfoProps {
  isOpen: boolean;
  onClose: () => void;
  item: DocumentImportDto;
}

export default function ModalmportInfo({
  isOpen,
  onClose,
  item,
}: ModalmportInfoProps) {
  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      scrollBehavior={"inside"}
      size="3xl"
      onOpenChange={onClose}
      placement={window.innerWidth >= 640 ? "center" : "top"}
    >
      <ModalContent>
        <ModalHeader className="flex justify-center text-2xl font-bold">
          Informações do processo
        </ModalHeader>
        <ModalBody>
          <div className="flex gap-2">
            <Input readOnly label="Arquivo importado:" value={item.fileName} />
            <Input
              readOnly
              className="max-w-[10rem]"
              label="Data de criação:"
              value={formatDate(item.createdAt)}
            />
          </div>
          <Input readOnly label="Mensagem do processo:" value={item.message} />
          {item.importErrors.length > 0 && (
            <Table removeWrapper selectionMode="single">
              <TableHeader>
                <TableColumn>Erros</TableColumn>
              </TableHeader>
              <TableBody>
                {item.importErrors.map((error, index) => (
                  <TableRow key={index}>
                    <TableCell>{error.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
          {item.documents.length > 0 && (
            <Table removeWrapper selectionMode="single">
              <TableHeader>
                <TableColumn>Documentos cadastrados</TableColumn>
              </TableHeader>
              <TableBody>
                {item.documents.map((document, index) => (
                  <TableRow key={index}>
                    <TableCell>{document.subject}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-2 pb-2 justify-end">
            <Button color="danger" variant="light" onPress={onClose}>
              Fechar
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
