import Card from "../general/card/Card";
import { useQuery } from "react-query";

// JSON propio https://github.com/SolracFrank/testing/blob/main/db.json

// API placeholder  `https://jsonplaceholder.org/users/${idDePrueba}`
const UserCards = () => {
  const idDePrueba = 2;
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
    <div className="grid grid-cols-3 gap-6 mx-10 w-full">
      <div
        className="bg-white border-solid border-px rounded-md shadow-lg
       shadow-gray-400 border-white col-span-1 min-w-[200px] min-h-[200px]"
      >
        <img src="../../assets/userimage-placeholder.png" alt="Agregar userImg ejemplo" className="" />

      </div>

      <Card
        title="Datos Personales"
        data={data}
        fieldsToShow={["firstname", "lastname", "email", "birthDate", "phone"]}
        className="col-span-2"
      />

      <Card
        title="Datos de Usuario"
        data={data.login}
        fieldsToShow={[
          "uuid",
          "username",
          "password",
          "md5",
          "sha1",
          "registered",
        ]}
        fieldDisplayConfig={{
          uuid: { label: "ID Único", stringify: true },
          registered: { label: "Registrado", stringify: true },
          username: { label: "Nombre de usuario", stringify: true },
        }}
        className="col-span-1"
      />
      <Card
        title="Domicilio"
        data={data.address}
        fieldsToShow={["street", "suite", "city", "zipcode"]}
        className="col-span-1"
      />
      <Card
        title="Company"
        data={data.company}
        fieldsToShow={["name", "catchPhrase", "bs"]}
        className="col-span-1"
      />
      <Card
        title="Probando Checkbox"
        data={data.otro}
        fieldsToShow={["state"]}
        fieldDisplayConfig={{
          state: { label: "Donador", isCheckBox: true },
        }}
        className="h-fit col-span-2"
      />
    </div>
  );
};

export default UserCards;
