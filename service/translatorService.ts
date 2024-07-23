import {
  CreateTranslatorDto,
  PageableTranslatorsDto,
  TranslatorDto,
} from "@/dto/translatorDto";
import axiosInstance from "@/utils/axiosInstance";
import throwError from "@/utils/errorUtils";

interface PaginatedApi {
  page: number;
  searchTerm?: string | undefined;
}

export const getPageableAlltranslators = async ({
  searchTerm,
  page,
}: PaginatedApi): Promise<PageableTranslatorsDto | undefined> => {
  try {
    const res = searchTerm
      ? await axiosInstance.get(
          `translators/search?text=${searchTerm}&page=${page - 1}`,
        )
      : await axiosInstance.get(`translators?page=${page - 1}`);

    return res.data;
  } catch (error) {
    throwError(error, "Erro ao obter tradutores:");
  }
};

export const createTranslator = async (
  data: CreateTranslatorDto,
): Promise<TranslatorDto | undefined> => {
  try {
    const res = await axiosInstance.post("translators", data);

    return res.data;
  } catch (error) {
    throwError(error, "Erro ao salvar o tradutor: ");
  }
};

export const updateTranslator = async (
  id: number,
  data: CreateTranslatorDto,
): Promise<TranslatorDto | undefined> => {
  try {
    const res = await axiosInstance.put(`translators/${id}`, data);

    return res.data;
  } catch (error) {
    throwError(error, "Erro ao atualizar o tradutor: ");
  }
};

export const deleteTranslator = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`translators/${id}`);
  } catch (error) {
    throwError(error, "Erro ao deletar o tradutor: ");
  }
};
