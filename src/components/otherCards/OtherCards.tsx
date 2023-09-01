import { Card } from "../general/card";
import SearchBarUser from "../searchBarUser/SearchBarUser";
import userimg from "../../assets/usuario.png";
import { useGetData } from "../hooks/useFetch";
import { useState } from "react";

const OtherCards = () => {
  const [userId, setUserId] = useState("1");
  const { status, data } = useGetData(
    "https://jsonplaceholder.org/users/",
    userId
  );

  function SearchUser(userId: string) {
    setUserId(userId);
  }
//Forzando cambio 
  if (status === "loading") return <p>cargando...</p>;
  if (status === "error") return <p>error</p>;

  return (
    <div className="mx-10 w-full ">
      <SearchBarUser SearchUser={SearchUser} />

      <div className="grid grid-cols-12 gap-2">
        <div
          className="bg-blue-1000 border-solid border-px rounded-md shadow-md shadow-gray-400 border-white
        col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-2 p-2
       "
        >
          <div className="flex sm:flex-row lg:flex-col space-x-2 h-full">
            <div className="sm:w-50 h-full w-64 md:w-56 lg:w-full">
              <img
                className="h-full w-full rounded"
                src={userimg}
                alt="userImg"
              />{" "}
              {/*lg:h-full  */}
            </div>

            <div
              className="h-full flex w-full flex-col text-left 
                  sm:flex-row sm:items-center  sm:justify-between  sm:space-x-2 sm:text-center 
                  md:flex-row md:items-center  md:justify-between  md:space-x-2 md:text-center 
                  lg:flex-col lg:items-start lg:align-middle lg:space-x-0 lg:text-left"
            >
              <div className="leading-3">
                <p className="font-semibold text-white text-lg">
                  {typeof data.firstname === "string"
                    ? data.firstname
                    : "No Data"}
                </p>
                <p className="text-blue-1100 font-light">Nombre /s</p>
              </div>
              <div className="leading-3">
                <p className="font-semibold text-white text-lg">
                  {typeof data.lastname === "string"
                    ? data.lastname
                    : "No Data"}
                </p>
                <p className="text-blue-1100 font-light">Apellido Paterno</p>
              </div>
              <div className="leading-3">
                <p className="font-semibold text-white text-lg">
                  {typeof data.lastname === "string"
                    ? data.lastname
                    : "No Data"}{" "}
                </p>
                <p className="text-blue-1100 font-light">Apellido Materno</p>
              </div>
            </div>
          </div>
        </div>
        <Card
          title="Datos Personales"
          data={data}
          fieldsToShow={[
            "id",
            "firstname",
            "lastname",
            "email",
            "birthDate",
            "phone",
            "website",
          ]}
          fieldDisplayConfig={{}}
          className="col-span-12 md:col-span-12 lg:col-span-10 w-full"
        />

        <Card
          title="Somatometria"
          data={data.address}
          className="lg:col-span-4 col-span-12"
        />

        <Card
          title="Informacion Academica"
          data={data.address}
          className="lg:col-span-4 col-span-12"
        />

        <Card
          title="Informacion económica"
          data={data.company}
          className="lg:col-span-4 col-span-12"
        />
      </div>
    </div>
  );
};

export default OtherCards;
