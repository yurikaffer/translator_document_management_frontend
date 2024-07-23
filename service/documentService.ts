import {
  CreateDocumentDto,
  DocumentDto,
  PageableDocumentsDto,
} from "@/dto/documentDto";
import axiosInstance from "@/utils/axiosInstance";
import throwError from "@/utils/errorUtils";

export const getPageableAllDocuments = async (
  searchTerm?: string,
): Promise<PageableDocumentsDto | undefined> => {
  try {
    const res = searchTerm
      ? await axiosInstance.get(`documents/search?text=${searchTerm}`)
      : await axiosInstance.get("documents");

    return res.data;
  } catch (error) {
    throwError(error, "Erro ao obter documentos:");
  }
};

export const createDocuments = async (
  data: CreateDocumentDto,
): Promise<DocumentDto | undefined> => {
  try {
    const res = await axiosInstance.post("documents", data);

    return res.data;
  } catch (error) {
    throwError(error, "Erro ao salvar documento:");
  }
};

export const updateDocuments = async (
  id: number,
  data: CreateDocumentDto,
): Promise<DocumentDto | undefined> => {
  try {
    const res = await axiosInstance.put(`documents/${id}`, data);

    return res.data;
  } catch (error) {
    throwError(error, "Erro ao atualizar documento:");
  }
};

export const deleteDocuments = async (id: number): Promise<void> => {
  try {
    await axiosInstance.delete(`documents/${id}`);
  } catch (error) {
    throwError(error, "Erro ao deletar documento:");
  }
};
