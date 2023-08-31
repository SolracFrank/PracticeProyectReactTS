import { Card } from "../general/card";
import { useQuery } from "react-query";
import img from "../../assets/logo2.png";
import userimg from "../../assets/usuario.png";


// JSON propio https://github.com/SolracFrank/testing/blob/main/db.json

// API placeholder  `https://jsonplaceholder.org/users/${idDePrueba}`
const OtherCards = () => {


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
    <div className="mx-10 w-full ">
      <div className="flex pb-4 lg:w-[90%] ">
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
                {data.firstname}
              </p>
              <p className="text-blue-1100 font-light">Nombre /s</p>
            </div>
            <div className="leading-3">
              <p className="font-semibold text-white text-xl">
                {data.lastname}
              </p>
              <p className="text-blue-1100 font-light">Apellido Paterno</p>
            </div>
            <div className="leading-3">
              <p className="font-semibold text-white text-xl">
                {data.lastname}
              </p>
              <p className="text-blue-1100 font-light">Apellido Materno</p>
            </div>
          </div>
        </div>
        <Card
          title="Datos Personales"
          data={data}
          fieldsToShow={['email','birthDate','phone','website']}
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
          fieldsToShow={['stret','suite','city','zipcode']}
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
          fieldDisplayConfig={{state:{label:'¿Es donador?',isCheckBox:true}}}
          className="h-fit col-span-2"
        />
      </div>
    </div>
  );
};

export default OtherCards;

