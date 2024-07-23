import axios from "axios";

export default function throwError(error: any, message: string) {
  if (axios.isAxiosError(error) && error.response) {
    console.log(message, error.response.data);
    throw new Error(error.response.data);
  } else {
    console.log("Unexpected error:", error);
    throw new Error(
      message + "Ocorreu um erro inesperado, tente novamente mais tarde.",
    );
  }
}
