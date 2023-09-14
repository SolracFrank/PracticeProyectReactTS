import { useState, useMemo, useEffect } from "react";
import img from "../../assets/logoProan.png";
import { useGetDataQuery } from "../hooks/useCache";

interface searchBarProps {
  SearchUser: (userId: string) => void;
}
interface User {
  personalId: string;
  names: string;
  lastName: string;
}


const SearchBarUser: React.FC<searchBarProps> = ({ SearchUser }) => {
  const [value, setValue] = useState("");
  const [usersData, setUsersData] = useState<User[]>([]);
  const { data, isLoading, isError } = useGetDataQuery({
    api: 'https://localhost:7075/api/employees',
    apiKey: 'usuarios',
    cacheTime: 86400000, 
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZTlkOTkxMC02YmE3LTRkMjAtOGE2NS0wOGQ5ZTRkNTI2MzIiLCJBY3RpdmUiOiJUcnVlIiwibmJmIjoxNjk0NzA1MjQ1LCJleHAiOjE2OTQ3MDg4NDUsImlzcyI6Imh0dHA6Ly8yMDEuMTYxLjgwLjExMiIsImF1ZCI6IjUzMmE2ZjZhLWZmNDktNDU2OC04Yzk0LTQ0ZDVmYjlhYjdlNyJ9.BB9ZnbpkeIUBaMwgnpkzD6Bs5FHWMqzV0bkrTqFdc3M"
  });

  useEffect(() => {
    if (data) {
      setUsersData(data);
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
      return usersData;
    }

    return usersData.filter((user) =>
      (
        user.names.toLowerCase() +
        " " +
        user.lastName.toLowerCase()
      ).includes(value.toLowerCase())
    );
  }, [usersData, value]);

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
      {value.length > 0 && !isLoading &&(
        <div className="absolute left-1 mt-10 w-full bg-white border rounded border-gray-300 shadow-md opacity-80">
          <ul>
            {filteredData.length > 0 ? (
              filteredData.slice(0, 5).map((user) => (
                <li
                  key={user.personalId}
                  className="py-2 px-4 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleUserClick(user.personalId)}
                >
                  {user.names + " " + user.lastName}
                </li>
              ))
            ) : ( isError ? (
              <p>Error  </p>
            )
              :
              (
                <p>Cargando...</p>
              )
            )}
          </ul>
        </div>
      )}
      <button
        className="border hover:bg-gray-100 border-blue-900 rounded-md mx-2 p-2"
        type="button"
        onClick={onClick}
        title="w"
      >
        Buscar
      </button>
    </div>
  );
};
export default SearchBarUser;
