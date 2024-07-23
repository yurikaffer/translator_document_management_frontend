import { Pagination } from "@nextui-org/pagination";

interface PaginationControlProps {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const PaginationControl = ({
  page,
  setPage,
  totalPages,
}: PaginationControlProps) => (
  <div className="flex w-full justify-center">
    <Pagination
      isCompact
      showControls
      showShadow
      color="primary"
      page={page}
      total={totalPages}
      onChange={setPage}
    />
  </div>
);

export default PaginationControl;
