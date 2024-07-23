import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useRef, useState } from "react";

import { CsvIcon } from "../ui/icons";

import { uploadArchive } from "@/service/documentImportService";

export interface ModalImportProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalNewImport({ isOpen, onClose }: ModalImportProps) {
  const [csvFile, setCsvFile] = useState<File | undefined>(undefined);
  const [isOpenPosUpload, setIsOpenPosUpload] = useState(false);

  const handleImportDocument = () => {
    if (csvFile) uploadArchive(csvFile);
    setIsOpenPosUpload(true);
  };

  const handleCloseModals = () => {
    onClose();
    setIsOpenPosUpload(false);
  };

  return (
    <>
      <Modal
        backdrop="blur"
        isOpen={isOpen}
        size="2xl"
        onOpenChange={onClose}
        placement={window.innerWidth >= 640 ? "center" : "top"}
      >
        <ModalContent>
          <ModalHeader className="flex justify-center text-2xl font-bold">
            Novo processo de importação
          </ModalHeader>
          <ModalBody>
            A importação tem o objetivo de otimizar o cadastro de novos
            documentos através de um processo de cadastro em massa. <br />
            <br />
            Para isso, você deve seguir as instruções abaixo: <br />
            <ul className="list-disc list-inside pb-5">
              <li>
                Baixe o modelo de arquivo CSV{" "}
                <a
                  download
                  className="font-semibold text-blue-600"
                  href="/modelo.csv"
                >
                  clicando aqui.
                </a>
              </li>
              <li>
                Preencha o arquivo com os dados dos documentos que deseja
                cadastrar.
              </li>
              <li> Apenas o campo location não é obrigatório.</li>
              <li> Adicione o arquivo preenchido clicando no botão abaixo.</li>
            </ul>
            <CsvUploadButton csvFile={csvFile} setCsvFile={setCsvFile} />
          </ModalBody>
          <ModalFooter>
            <div className="flex gap-2 pb-2 justify-end">
              <Button color="danger" variant="light" onPress={onClose}>
                Cancelar
              </Button>
              <Button
                color="primary"
                isDisabled={!csvFile}
                type="submit"
                onPress={() => handleImportDocument()}
              >
                Importar
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ModalPosUpload isOpen={isOpenPosUpload} onClose={handleCloseModals} />
    </>
  );
}

function ModalPosUpload({ isOpen, onClose }: ModalImportProps) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} size="3xl" onOpenChange={onClose} placement={window.innerWidth >= 640 ? "center" : "top"}>
      <ModalContent>
        <ModalHeader className="flex justify-center text-2xl font-bold">
          Sua importação está sendo processada ✔️
        </ModalHeader>
        <ModalBody>
          <span className="font-bold text-lg">⚠️ Atenção:</span>
          <ul className="list-disc list-inside" title="Atenção:">
            <li>
              Esse processo pode ser demorado dependendo da quantidade de
              documentos que você está importando.
            </li>
            <li>
              Assim que a importação for concluída, você poderá verificar as
              inforamções detalhadas do processo na central de importações.
            </li>
            <li>
              Atenção com os erros registrados, as linhas de erro indicam que um
              documento não foi importado e seu respetivo motivo.
            </li>
            <li>
              Documentos importados com sucesso serão exibidos na página de
              documentos cadastrados.
            </li>
          </ul>
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

interface CsvUploadProps {
  setCsvFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  csvFile: File | undefined;
}

const CsvUploadButton = ({ setCsvFile, csvFile }: CsvUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCsvFile(event.target.files?.[0]);
  };

  return (
    <div className="flex gap-1 ">
      <Button
        className="bg-[#469B61] text-white font-semibold "
        startContent={<CsvIcon />}
        onPress={handleButtonClick}
      >
        Adicionar
      </Button>
      <Input
        readOnly
        className="text-white max-w-[15rem]"
        color={csvFile ? "success" : "default"}
        isInvalid={!csvFile ? true : false}
        value={csvFile ? csvFile.name : "Nenhum arquivo adicionado."}
      />
      <input
        ref={fileInputRef}
        accept=".csv"
        style={{ display: "none" }}
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};
