import { Search, X } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getQueryUrl } from "../untils/helpers";

interface PropType {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
  clearInput: () => void;
}

const SearchNavBar: React.FC<PropType> = ({ onChange, value, clearInput }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    const queryParams = getQueryUrl(value);
    navigate(`?query=${queryParams}`);
  };
  return (
    <div className="flex w-96  rounded items-center px-5 bg-slate-100">
      <input
        value={value}
        onChange={onChange}
        placeholder="Search notes"
        type="text"
        className="rounded w-full text-sm outline-none bg-transparent py-3 "
      />
      {value && (
        <X
          onClick={clearInput}
          size={22}
          className="cursor-pointer text-slate-500 hover:text-black mr-3"
        />
      )}
      <Search
        onClick={handleNavigate}
        className="text-slate-500 hover:text-black cursor-pointer"
        size={22}
      />
    </div>
  );
};

export default SearchNavBar;
