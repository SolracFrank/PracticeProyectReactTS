import CardBodyElement from "./CardBodyElement";
type NestedObject = {
  [key: string]: string | NestedObject; // de la forma {(key:string) : value:string or {(key:string) : value:string or {...}}}
};
//Interfaz para ver la forma en que mostraremos los datos en la crad
interface FieldDisplayConfig {
  [fieldName: string]: {
    label: string; //Reemplaza el label de la Api por el que indiquemos (ej 'id' => 'ID del User')
    stringify?: boolean; //Le decimos sí debemos mostrar el label como viene en API o personalizado
    isCheckBox?: boolean; //Para ver si el campo es CheckBox
  };
}

//Interfaz para las props de la card, incluye título, datos de la Api; qué datos mostraremos, etc.
interface CardProps {
  expanded: boolean;
  data: NestedObject;
  fieldsToShow: string[];
  fieldDisplayConfig?: FieldDisplayConfig;
  className?: string;
}

//Convierte 'camelCase' to 'Camel Case'; En caso de que no usemos "FieldDisplayConfig".
const convertFieldName = (name: string): string => {
  const words = name.split(/(?=[A-Z])/); // Los separa con regex por Letra Mayus
  const formattedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return formattedWords.join(" ");
};
const CardBody: React.FC<CardProps> = ({
  data,
  fieldsToShow,
  fieldDisplayConfig = {},
  expanded,
}) => {
  //Obtiene los objetos anidados (if exist) devuelve string, otro objeto anidado o undefined
  const getNestedFieldValue = (
    obj: NestedObject | undefined,
    path: string[]
  ): string | NestedObject | undefined => {
    return path.reduce<string | NestedObject | undefined>(
      (acc, key) =>
        acc && typeof acc === "object" && key in acc ? acc[key] : undefined,
      obj
    );
  };
  
  return (
    //Variación de columnas por cantidad de datos (<p></p> e <input> son 1 dato)
    <div
      className={`grid grid-cols-1 gap-1 ${ //Si son 1 a 4 campos, una columna
        expanded ? "" : "hidden"
      } transition-transform duration-1000 ${
        fieldsToShow.length > 4 ? "md:grid-cols-2" : ""} ${ //Si son 5 a 12 campos; muestra dos columnas
       fieldsToShow.length > 12 ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:space-y-4" : ""}`} //13 o más, 3 columnas
    >
      {/*Para cada campo que se desea mostrar de la API*/}
      {fieldsToShow.map((field, index) => {
        const formattedFieldName = convertFieldName(field); //Configuramos su nombre
        const fieldValue = getNestedFieldValue(data, field.split(".")); //Obtiene su valor, si existe, si es uno o si es anidado
        const fieldConfig = fieldDisplayConfig[field] || {}; // Configuración de visualización, nombres unicos, si se muestran, o si el tipo es checkbox

        const label = fieldConfig.label || field;
        const shouldStringify = fieldConfig.stringify || false;
        return (
          //Cuerpo de la card
          <CardBodyElement
            key={index}
            isCheckBox={fieldConfig.isCheckBox || false}
            fieldValue={fieldValue}
            label={label}
            shouldStringify={shouldStringify}
            formattedFieldName={formattedFieldName}
          />
        );
      })}
    </div>
  );
};

export default CardBody;
