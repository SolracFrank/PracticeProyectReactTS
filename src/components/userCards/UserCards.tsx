import Card from "../general/card/Card";
import { useQuery } from "react-query";

// JSON propio https://github.com/SolracFrank/testing/blob/main/db.json

// API placeholder  `https://jsonplaceholder.org/users/${idDePrueba}`
const UserCards = () => {
  const idDePrueba = 1;
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
    <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-4 py-4 overflow-y-scroll">
      <Card
        title="Datos Personales"
        data={data}
        fieldsToShow={["firstname", "lastname", "email", "birthDate", "phone"]}
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
        className="overflow-y-clip"
      />
      <Card
        title="Domicilio"
        data={data.address}
        fieldsToShow={["street", "suite", "city", "zipcode"]}
      />
      <Card
        title="Company"
        data={data.company}
        fieldsToShow={["name", "catchPhrase", "bs"]}
      />
       <Card
        title="Probando Check"
        data={data.otro}
        fieldsToShow={[
          "state"
        ]}
        fieldDisplayConfig={{
          state: { label: "Estado", stringify: true, isCheckBox: true},
        }}
        className="overflow-y-clip"
      />
    </div>
  );
};

export default UserCards;
