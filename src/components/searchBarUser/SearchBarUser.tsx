import {  useState } from "react";
import img from "../../assets/logo2.png";



 const SearchBarUser: React.FC = () => {
    const [value, setValue] = useState("");

    function OnChange(e: React.ChangeEvent<HTMLInputElement>)
    {
        setValue(e.target.value);
    }
    function onClick()
    {
        console.log("ProbandoClc")
    }

  return (
    <div className="flex pb-4 lg:w-[90%] ">
      <img className="w-12 h-10 mx-2 ml-0" src={img} alt="" />
      <input
        className="w-full rounded-md border border-blue-900 
        px-3 py-2 text-sm shadow-sm focus:border-blue-1100 
        focus:outline-none mx-2"
        type="text"
        placeholder="Búsqueda"
        onChange={OnChange}
        value={value}
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
export default SearchBarUser;
