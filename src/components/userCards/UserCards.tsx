import { Card } from "../general/card";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import img from "../../assets/logoProan.png";
import userimg from "../../assets/usuario.png";
import jsonData from "../../db.json";

// JSON propio https://github.com/SolracFrank/testing/blob/main/db.json

// API placeholder  `https://jsonplaceholder.org/users/${idDePrueba}`
const UserCards = () => {
  const [ldata, setData] = useState({});
  const [ldata2, setData2] = useState({});
  const [ldata3, setData3] = useState({});
  const [ldata4, setData4] = useState({});
  useEffect(() => {
    try {
      setData(jsonData[0]);
      setData2(jsonData[1]);
      setData3(jsonData[2]);
      setData4(jsonData[3]);
    } catch (error) {
      console.log(error);
    }
  }, []);
//
  const idDePrueba = 4;
  const getProducts = async () => {
    const response = await fetch(
      `https://jsonplaceholder.org/users/${idDePrueba}`
    );
    return response.json();
  };

  const { data, status } = useQuery("user", getProducts);

  if (status == "loading") {
    return <p> cargando...</p>;
  }
  if (status == "error") {
    return <p> error</p>;
  }

  return (
    <div className="mx-10 w-full">
      
      <div className="flex pb-4 lg:w-[90%]">
        <img className="w-12 h-10 mx-2 ml-0" src={img} alt="" />
        <input
          className="w-full rounded-md border border-blue-900 
        px-3 py-2 text-sm shadow-sm focus:border-blue-1100 
        focus:outline-none mx-2"
          type="text"
          placeholder="Búsqueda"
        />
        <button
          className="border hover:bg-gray-100 border-blue-900 rounded-md mx-2 p-2"
          type="button"
        >
          Buscar
        </button>
      </div>
      
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
                  {data.firstname}
                </p>
                <p className="text-blue-1100 font-light">Nombre /s</p>
              </div>
              <div className="leading-3">
                <p className="font-semibold text-white text-lg">
                  {data.lastname}
                </p>
                <p className="text-blue-1100 font-light">Apellido Paterno</p>
              </div>
              <div className="leading-3">
                <p className="font-semibold text-white text-lg">
                  {data.lastname}
                </p>
                <p className="text-blue-1100 font-light">Apellido Materno</p>
              </div>
            </div>
          </div>
        </div>

        <Card
          title="Datos Personales"
          data={ldata}
          fieldsToShow={[]}
          fieldDisplayConfig={{
            clave: { label: "Clave única", stringify: true },
            curp: { label: "CURP", stringify: true },
          }}
          className="col-span-12 md:col-span-12 lg:col-span-10 w-full"
        />

        <Card
          title="Somatometria"
          data={ldata2}
          className="lg:col-span-4 col-span-12 sm:col-span-6 md:col-span-6"
          fieldDisplayConfig={{
            donador: { label: "Donador", stringify: true, isCheckBox: true },
          }}
        />

        <Card
          title="Informacion Academica"
          data={ldata3}
          className="lg:col-span-4 col-span-12 sm:col-span-6 md:col-span-6"
        />

        <Card
          title="Informacion económica"
          data={ldata4}
          className="lg:col-span-4 col-span-12 sm:col-span-12 md:col-span-12"
          fieldDisplayConfig={{
            tieneAutos: { label: "¿Tiene Autos?", stringify: true },
            cuantos: { label: "¿Cuántos?", stringify: true },
            numAsegurados: { label: "Núm. Asegurados", stringify: true },
          }}
        />
      </div>
    </div>
  );
};

export default UserCards;
