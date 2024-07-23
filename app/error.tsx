"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Ocorreu algum erro inesperado.</h2>
      <span>Tente novamente mais tarde.</span>
    </div>
  );
}
