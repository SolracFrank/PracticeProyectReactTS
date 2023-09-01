import { useState, useEffect, useMemo } from "react";
import img from "../../assets/logo2.png";
import { useGetAllData } from "../hooks/useFetch";

interface searchBarProps {
  SearchUser: (userId: string) => void;
}
interface User {
  id: string;
  firstname: string;
  lastname: string;
}
const SearchBarUser: React.FC<searchBarProps> = ({ SearchUser }) => {
  const [value, setValue] = useState("");
  const [allData, setAllData] = useState<User[]>([]);
  const { data } = useGetAllData("https://jsonplaceholder.org/users");

  useEffect(() => {
    if (data) {
      setAllData(data);
    }
  }, [data]);

  function OnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  function onClick() {
    SearchUser(value);
  }

  const filteredData = useMemo(() => {
    if (value.length === 0) {
      return allData;
    }

    return allData.filter((user) =>
      (
        user.firstname.toLowerCase() +
        " " +
        user.lastname.toLowerCase()
      ).includes(value.toLowerCase())
    );
  }, [allData, value]);

  const handleUserClick = (id: string) => {
    SearchUser(id);
    setValue("");
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onClick();
      setValue("");
    }
  };
  if (allData.length === 0) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="flex pb-4 lg:w-[90%] relative">
      <img className="w-12 h-10 mx-2 ml-0" src={img} alt="" />
      <input
        className="w-full rounded-md border border-blue-900 
        px-3 py-2 text-sm shadow-sm focus:border-blue-1100 
        focus:outline-none mx-2"
        type="text"
        placeholder="Búsqueda"
        onChange={OnChange}
        value={value}
        onKeyUp={handleKeyPress}
      />
      {value.length > 0 && (
        <div className="absolute left-1 mt-10 w-full bg-white border rounded border-gray-300 shadow-md opacity-80">
          <ul>
            {filteredData.slice(0, 5).map((user) => (
              <li
                key={user.id}
                className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleUserClick(user.id)}
              >
                {user.firstname + " " + user.lastname}
              </li>
            ))}
          </ul>
        </div>
      )}
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
