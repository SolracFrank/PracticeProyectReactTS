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

  if (status === "loading") return <p>cargando...</p>;
  if (status === "error") return <p>error</p>;

  return (
    <div className="mx-10 w-full ">
      <SearchBarUser SearchUser={SearchUser} />

      <div className="grid grid-cols-12 mb-2 ">
        <div
          className="bg-blue-1000 border-solid border-px rounded-md shadow-md shadow-gray-400 border-white
        lg:w-11/12 justify-items-center items-center lg:justify-items-start lg:items-start
        col-span-12 sm:col-span-12 lg:col-span-2
        grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 p-1"
        >
          <div className="p-1 flex">
            <img
              className="lg:h-[180px] lg:w-[200px] xl:w-[300px] xl:h-[150px] h-[200px]"
              src={userimg}
              alt="userImg"
            />{" "}
            {/*lg:h-full  */}
          </div>

          <div className="ml-2 pb-2">
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
                {typeof data.lastname === "string" ? data.lastname : "No Data"}
              </p>
              <p className="text-blue-1100 font-light">Apellido Paterno</p>
            </div>
            <div className="leading-3">
              <p className="font-semibold text-white text-lg">
                {typeof data.lastname === "string" ? data.lastname : "No Data"}{" "}
              </p>
              <p className="text-blue-1100 font-light">Apellido Materno</p>
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
          className="col-span-12 md:col-span-12 lg:col-span-10 w-full mt-2 lg:mt-0"
        />
      </div>

      <div className="grid grid-cols-12  gap-2 mb-2 ">
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
