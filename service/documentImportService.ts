import axiosInstance from "@/utils/axiosInstance";
import throwError from "@/utils/errorUtils";

export const uploadArchive = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  try {
    await axiosInstance.post("documentImport/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    throwError(error, "Erro ao importar arquivo: ");
  }
};
