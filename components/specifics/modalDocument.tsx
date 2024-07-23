import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SearchIcon } from "../ui/icons";

import { useDocuments } from "@/contexts/documentContext";
import { useTranslator } from "@/contexts/translatorContext";
import { CreateDocumentDto, DocumentDto } from "@/dto/documentDto";
import { useTranslatorsHook } from "@/hooks/useTranslatorsHook";
import { createDocuments, updateDocuments } from "@/service/documentService";

const documentSchema = z.object({
  subject: z
    .string()
    .min(1, "O assunto é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  content: z
    .string()
    .min(1, "O conteúdo é obrigatório")
    .max(100000000, "O nome deve ter no máximo 100000000 caracteres"), // Entender
  location: z
    .string()
    .regex(
      /^[a-z]{2}-[a-z]{2}$/,
      "O idioma do documento deve estar no formato xx-xx (exemplo: pt-br)",
    )
    .or(z.literal("")),
  author: z
    .string()
    .min(1, "O autor é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  translator: z.string().min(1, "O tradutor é obrigatório"),
});

type FormSchema = z.infer<typeof documentSchema>;

export interface ModalDocumentProps {
  item?: DocumentDto;
  isOpen: boolean;
  onClose: () => void;
  moreDetails?: boolean;
}

export function ModalDocument({
  item,
  isOpen,
  onClose,
  moreDetails,
}: ModalDocumentProps) {
  const { documents, setDocuments } = useDocuments();
  const { translators, setTranslator, translator } = useTranslator();
  const [autocompleteValue, setAutocompleteValue] = useState<
    string | undefined
  >(undefined);
  const [isSelectionChanged, setIsSelectionChanged] = useState(false);
  const { setSearchTerm, loadMore, page, pages, resetTranslators } =
    useTranslatorsHook();
  const [autocompleteIsOpen, setAutocompleteIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(documentSchema),
  });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore: page < pages,
    isEnabled: autocompleteIsOpen,
    shouldUseLoader: false,
    onLoadMore: loadMore,
  });

  useEffect(() => {
    if (item) {
      setValue("subject", item.subject);
      setValue("content", item.content);
      setValue("location", item.location);
      setValue("author", item.author);
      setValue("translator", item.translator.name);
      setAutocompleteValue(item.translator.name);
      setTranslator(item.translator);
    } else {
      reset();
    }
  }, [item]);

  const onSubmit = async (data: FormSchema) => {
    if (!translator) {
      console.error("Nenhum tradutor selecionado");

      return;
    }
    const document: CreateDocumentDto = {
      subject: data.subject,
      content: data.content,
      location: data.location,
      author: data.author,
      translator,
    };

    try {
      if (item) {
        const updatedDocument = await updateDocuments(item.id, document);

        if (updatedDocument) {
          setDocuments(
            documents.map((d) => (d.id === item.id ? updatedDocument : d)),
          );
        }
      } else {
        const createdDocument = await createDocuments(document);

        if (createdDocument) {
          setDocuments([createdDocument, ...documents]);
        }
      }
      onCloseModal();
    } catch (error) {
      console.error("Erro ao salvar documento:", error);
    }
  };

  const onCloseModal = () => {
    clearErrors();
    onClose();
    reset();
  };

  const onSelectionChange = (key: React.Key | null) => {
    setIsSelectionChanged(true);
    const translator = translators?.find((t) => t.id === Number(key));

    if (translator) {
      setTranslator(translator);
    }
  };

  useEffect(() => {
    const updateSearch = (term: string) => {
      resetTranslators();
      setSearchTerm(term);
    };

    if (autocompleteValue && !isSelectionChanged) {
      const handler = setTimeout(() => {
        updateSearch(autocompleteValue);
      }, 700);

      return () => clearTimeout(handler);
    } else if (autocompleteValue === "") {
      updateSearch("");
    }

    setIsSelectionChanged(false);
  }, [autocompleteValue]);

  const handleInputSize = () => (
    window.innerWidth >= 640 ? "md" : "lg"
  )

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      size="xl"
      onOpenChange={onCloseModal}
      placement={window.innerWidth >= 640 ? "center" : "top"}
    >
      <ModalContent>
        <ModalHeader className="flex justify-center text-2xl font-bold">
          {moreDetails
            ? "Detalhes do Documento"
            : item
              ? "Editar Documento"
              : "Cadastro de Documento"}
        </ModalHeader>
        <ModalBody>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              size={handleInputSize()}
              label="Assunto"
              {...register("subject")}
              errorMessage={errors.subject?.message}
              isDisabled={moreDetails}
              isInvalid={!!errors.subject}
            />
            <Textarea
              size={handleInputSize()}
              label="Conteúdo"
              {...register("content")}
              errorMessage={errors.content?.message}
              isDisabled={moreDetails}
              isInvalid={!!errors.content}
            />
            <div className="flex gap-2">
              <Input
                size={handleInputSize()}
                label="Código da Localização"
                {...register("location")}
                errorMessage={errors.location?.message}
                isDisabled={moreDetails}
                isInvalid={!!errors.location}
              />
              <Input
                size={handleInputSize()}
                label="Autor"
                {...register("author")}
                errorMessage={errors.author?.message}
                isDisabled={moreDetails}
                isInvalid={!!errors.author}
              />
            </div>
            <Autocomplete
              size={handleInputSize()}
              errorMessage={errors.translator?.message}
              isDisabled={moreDetails}
              isInvalid={!!errors.translator}
              label="Selecione o Tradutor"
              placeholder="Pesquise por um Tradutor"
              onClear={() => setValue("translator", "")}
              {...register("translator")}
              inputValue={autocompleteValue}
              items={translators}
              scrollRef={scrollerRef}
              startContent={<SearchIcon className="mb-[3px]" />}
              onInputChange={(value: string) => setAutocompleteValue(value)}
              onOpenChange={setAutocompleteIsOpen}
              onSelectionChange={onSelectionChange}
            >
              {(translator) => (
                <AutocompleteItem key={translator.id} value={translator.id}>
                  {translator.name}
                </AutocompleteItem>
              )}
            </Autocomplete>
            <div className="flex gap-2 pb-2 justify-end">
              <Button color="danger" variant="light" onPress={onCloseModal}>
                Cancelar
              </Button>
              {!moreDetails && (
                <Button color="primary" type="submit">
                  {item ? "Atualizar" : "Adicionar"} Documento
                </Button>
              )}
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
