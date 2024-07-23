import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useTranslator } from "@/contexts/translatorContext";
import { TranslatorDto } from "@/dto/translatorDto";
import {
  createTranslator,
  updateTranslator,
} from "@/service/translatorService";

const translatorSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  email: z
    .string()
    .min(1, "O e-mail é obrigatório")
    .email("E-mail inválido")
    .max(100, "O e-mail deve ter no máximo 100 caracteres"),
  sourceLanguage: z
    .string()
    .min(1, "O idioma de origem é obrigatório")
    .regex(
      /^[a-z]{2}-[a-z]{2}$/,
      "O idioma de origem deve estar no formato xx-xx (exemplo: pt-br)",
    ),
  targetLanguage: z
    .string()
    .min(1, "O idioma destino é obrigatório")
    .regex(
      /^[a-z]{2}-[a-z]{2}$/,
      "O idioma destino deve estar no formato xx-xx (exemplo: pt-br)",
    ),
});

type FormSchema = z.infer<typeof translatorSchema>;

export interface ModalTranslatorProps {
  item?: TranslatorDto;
  isOpen: boolean;
  onClose: () => void;
  moreDetails?: boolean;
}

export function ModalTranslator({
  item,
  isOpen,
  onClose,
  moreDetails,
}: ModalTranslatorProps) {
  const { translators, setTranslators } = useTranslator();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    setError,
  } = useForm<FormSchema>({
    resolver: zodResolver(translatorSchema),
  });

  useEffect(() => {
    if (item) {
      setValue("name", item.name);
      setValue("email", item.email);
      setValue("sourceLanguage", item.sourceLanguage);
      setValue("targetLanguage", item.targetLanguage);
    } else {
      reset();
    }
  }, [item, reset, setValue]);

  const onSubmit = async (data: FormSchema) => {
    try {
      if (item) {
        const updatedDocument = await updateTranslator(item.id, data);

        if (updatedDocument) {
          setTranslators(
            translators.map((t) => (t.id === item.id ? updatedDocument : t)),
          );
        }
      } else {
        const createdTranslator = await createTranslator(data);

        if (createdTranslator) {
          setTranslators([createdTranslator, ...translators ]);
        }
      }

      onCloseModal();
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Este email já está em uso."
      ) {
        setError("email", { type: "manual", message: error.message });
      } else {
        // Tratamento para outros tipos de erros.
      }
    }
  };

  const onCloseModal = () => {
    clearErrors();
    onClose();
    reset();
  };

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
            ? "Detalhes do Tradutor"
            : item
              ? "Editar Tradutor"
              : "Cadastro de Tradutor"}
        </ModalHeader>
        <ModalBody>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              size={handleInputSize()}
              label="Nome"
              {...register("name")}
              errorMessage={errors.name?.message}
              isDisabled={moreDetails ? true : false}
              isInvalid={errors.name ? true : false}
            />
            <Input
              size={handleInputSize()}
              label="E-mail"
              {...register("email")}
              errorMessage={errors.email?.message}
              isDisabled={moreDetails ? true : false}
              isInvalid={errors.email ? true : false}
            />
            <div className="flex gap-2">
              <Input
                size={handleInputSize()}
                label="Código do idioma de origem"
                {...register("sourceLanguage")}
                errorMessage={errors.sourceLanguage?.message}
                isDisabled={moreDetails ? true : false}
                isInvalid={errors.sourceLanguage ? true : false}
              />
              <Input
                size={handleInputSize()}
                label="Código do idioma destino"
                {...register("targetLanguage")}
                errorMessage={errors.targetLanguage?.message}
                isDisabled={moreDetails ? true : false}
                isInvalid={errors.targetLanguage ? true : false}
              />
            </div>
            <div className="flex gap-2 pb-2 justify-end">
              <Button color="danger" variant="light" onPress={onCloseModal}>
                Cancelar
              </Button>
              {!moreDetails && (
                <Button color="primary" type="submit">
                  {item ? "Atualizar" : "Adicionar"} Tradutor
                </Button>
              )}
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
