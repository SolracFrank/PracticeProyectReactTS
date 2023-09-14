import { Card } from "../general/card";
// import SearchBarUser from "../searchBarUser/SearchBarUser";
import userimg from "../../assets/usuario.png";
import { useState } from "react";
import { useGetDataQuery } from "../hooks/useCache";

const OtherCards = () => {
  const [userId] = useState("00006");

  const { data, isLoading, isError } = useGetDataQuery( {
    api: 'https://localhost:7075/api/employees',
    apiField: '/'+userId,
    apiKey: 'usuario',
    cacheTime: 86400000, 
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZTlkOTkxMC02YmE3LTRkMjAtOGE2NS0wOGQ5ZTRkNTI2MzIiLCJBY3RpdmUiOiJUcnVlIiwibmJmIjoxNjk0NzE0NTY0LCJleHAiOjE2OTQ3MTgxNjQsImlzcyI6Imh0dHA6Ly8yMDEuMTYxLjgwLjExMiIsImF1ZCI6IjUzMmE2ZjZhLWZmNDktNDU2OC04Yzk0LTQ0ZDVmYjlhYjdlNyJ9.tSoo4VTzo-CUsEcx7-AoHE0ytlFlUxj52tSbrC__jCw'
  }
  );


//86400000
  // function SearchUser(userId: string) {
  //   setUserId(userId);
  // }
  //Forzando cambio
  console.log(data);
  if (isLoading)
  if (isError) return <p>error</p>;

  return (
    <div className="mx-10 w-full ">
      {/* <SearchBarUser SearchUser={SearchUser} /> */}

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
                  {typeof data.names === "string"
                    ? data.names
                    : "No Data"}
                </p>
                <p className="text-blue-1100 font-light">Nombre /s</p>
              </div>
              <div className="leading-3">
                <p className="font-semibold text-white text-lg">
                  {typeof data.lastName === "string"
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
