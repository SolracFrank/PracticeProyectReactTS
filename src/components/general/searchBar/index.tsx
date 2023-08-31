import { ChangeEvent } from "react";
import img from "../../../assets/logo2.png";
interface searchBarProps
{
  keywords: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: () => void;
}


export const SearchBar: React.FC<searchBarProps> = ({
  keywords,
  onChange,
  onClick
}) => {
  return (
    <div className="flex pb-4 lg:w-[90%] ">
      <img className="w-12 h-10 mx-2 ml-0" src={img} alt="" />
      <input
        className="w-full rounded-md border border-blue-900 
        px-3 py-2 text-sm shadow-sm focus:border-blue-1100 
        focus:outline-none mx-2"
        type="text"
        placeholder="Búsqueda"
        onChange={onChange}
        value={keywords}
      />
      <button
        className="border hover:bg-gray-100 border-blue-900 rounded-md mx-2 p-2"
        type="button"
        onClick={onClick}
      >
        Buscar
      </button>
    </div>
  );
};
