import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { Plus } from "@phosphor-icons/react";
import { useCallback, useState } from "react";

import { ChevronDownIcon } from "./icons";
import SearchInput from "./searchInput";

interface HeaderTableProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  ModalComponent: React.ComponentType<any>;
  itemsTitle: string;
  itemName: string;
  setLimitPages: React.Dispatch<React.SetStateAction<number>>;
  limitPages: number;
}

const itensPerPage = [10, 20, 30, 40, 50];

const HeaderTable = ({
  searchTerm,
  setSearchTerm,
  ModalComponent,
  itemsTitle,
  itemName,
  setLimitPages,
  limitPages,
}: HeaderTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = useCallback(
    () => setIsModalOpen((prev) => !prev),
    [],
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-[28px] font-semibold">Central de {itemsTitle}</h1>
      <div className="flex flex-col justify-between items-center gap-2 md:flex-row">
        <SearchInput
          placeholder={`Buscar ${itemsTitle.toLowerCase()}...`}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="flex gap-2 w-full md:w-auto justify-end ">
          <ItensPerPageButton
            limitPages={limitPages}
            setLimitPages={setLimitPages}
          />
          <Button className="px-10 w-full md:w-auto" color="primary" onPress={handleModalToggle}>
            <div className="flex gap-1 items-center">
              <Plus size={18} weight="bold" />
              {itemName}
            </div>
          </Button>  
        </div>
          
        {isModalOpen && (
          <ModalComponent isOpen={isModalOpen} onClose={handleModalToggle} />
        )}
      </div>
    </div>
  );
};

function ItensPerPageButton({
  setLimitPages,
  limitPages,
}: {
  limitPages: number;
  setLimitPages: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <ButtonGroup variant="flat">
      <Button>{limitPages}</Button>
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly>
            <ChevronDownIcon />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          {itensPerPage.map((item) => (
            <DropdownItem
              key={item}
              value={item}
              onClick={() => setLimitPages(item)}
            >
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </ButtonGroup>
  );
}

export default HeaderTable;
