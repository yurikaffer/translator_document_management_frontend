import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";

import { SearchIcon } from "./icons";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder: string;
}
const SearchInput = ({
  searchTerm,
  setSearchTerm,
  placeholder,
}: SearchInputProps) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value.length === 0 ? handleClear() : setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const handleClear = () => {
    setInputValue("");
    setSearchTerm("");
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Input
        isClearable
        className="w-full rounded-r-full "
        placeholder={placeholder}
        startContent={<SearchIcon />}
        value={inputValue}
        onChange={handleInputChange}
        onClear={handleClear}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <Button
        className="bg-gray-100 hover:bg-gray-300 dark:bg-[#27272A] dark:hover:bg-[#3F3F46] shadow-sm px-10"
        onClick={handleSearch}
      >
        <span>Pesquisar</span>
      </Button>
    </div>
  );
};

export default SearchInput;
