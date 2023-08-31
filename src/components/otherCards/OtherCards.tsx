import { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "../general/card";
import SearchBarUser from "../searchBarUser/SearchBarUser";
import { NestedObject } from "../../interfaces/Interfaces";
import userimg from "../../assets/usuario.png";

const OtherCards = () => {
  const [data, setData] = useState<NestedObject>({});
  const [status, setStatus] = useState("loading");

  const idDePrueba = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://jsonplaceholder.org/users/${idDePrueba}`
        );
        setData(response.data);
        setStatus("success");
      } catch (error) {
        setStatus("error");
      }
    };

    fetchData();
  }, []);

  if (status === "loading") {
    return <p>cargando...</p>;
  }

  if (status === "error") {
    return <p>error</p>;
  }

  return (
    <div className="mx-10 w-full ">
      <SearchBarUser />

      <div className="grid grid-cols-12 gap-1 ">
        <div
          className="bg-blue-1000 border-solid border-px 
        rounded-md shadow-md shadow-gray-400 border-white 
        col-span-12  sm:col-span-12 md:col-span-12 lg:grid-cols-1 lg:col-span-3 grid md:grid-cols-2 grid-cols-2 
        lg:h-full justify-items-center lg:justify-items-start items-center lg:items-start mx-auto "
        >
          <div className="m-2 h-full flex p-2">
            <img className="lg:h-full  " src={userimg} alt="userImg" />
          </div>

          <div className="m-3 space-y-2 ">
            <div className="leading-3">
              <p className="font-semibold text-white text-xl">
                {typeof data.firstname === "string"
                  ? data.firstname
                  : "No Data"}
              </p>
              <p className="text-blue-1100 font-light">Nombre /s</p>
            </div>
            <div className="leading-3">
              <p className="font-semibold text-white text-xl">
                {typeof data.lastname === "string" ? data.lastname : "No Data"}
              </p>
              <p className="text-blue-1100 font-light">Apellido Paterno</p>
            </div>
            <div className="leading-3">
              <p className="font-semibold text-white text-xl">
                {typeof data.lastname === "string" ? data.lastname : "No Data"}
              </p>
              <p className="text-blue-1100 font-light">Apellido Materno</p>
            </div>
          </div>
        </div>
        <Card
          title="Datos Personales"
          data={data}
          fieldsToShow={["email", "birthDate", "phone", "website"]}
          className="col-span-12 md:col-span-12 lg:col-span-9"
        />
      </div>

      <div className="grid grid-cols-12 gap-1 min-h-[300px]">
        <Card
          title="Somatometria"
          data={data.login}
          className="lg:col-span-4 col-span-12"
        />

        <Card
          title="Informacion Academica"
          data={data.address}
          fieldsToShow={["stret", "suite", "city", "zipcode"]}
          className="lg:col-span-4 col-span-12"
        />

        <Card
          title="Informacion económica"
          data={data.company}
          className="lg:col-span-4 col-span-12"
        />
      </div>

      <div className="grid grid-cols-3 gap-1">
        <Card
          title="Probando Checkbox"
          data={data.otro}
          fieldsToShow={["state"]}
          fieldDisplayConfig={{
            state: { label: "¿Es donador?", isCheckBox: true },
          }}
          className="h-fit col-span-2"
        />
      </div>
    </div>
  );
};

export default OtherCards;
