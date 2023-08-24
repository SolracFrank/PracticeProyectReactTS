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
  //Obtiene los objetos anidados (if exist)
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
    <div
      className={`grid grid-cols-1 gap-1 ${
        expanded ? "" : "hidden"
      } transition-transform duration-1000 ${
        fieldsToShow.length > 4 ? "grid-cols-2" : ""
      } ${fieldsToShow.length > 12 ? "lg:grid-cols-3" : ""}`}
    >
      {fieldsToShow.map((field, index) => {
        const formattedFieldName = convertFieldName(field);
        const fieldValue = getNestedFieldValue(data, field.split("."));
        const fieldConfig = fieldDisplayConfig[field] || {}; // Configuración de visualización para el campo

        const label = fieldConfig.label || field;
        const shouldStringify = fieldConfig.stringify || false;
        return (
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
