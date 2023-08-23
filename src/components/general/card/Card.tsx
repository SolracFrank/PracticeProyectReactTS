import React, { useState } from "react";
//Interface para objetos anidados
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
  title: string;
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
//Componente pa' la card
const Card: React.FC<CardProps> = ({
  title,
  data,
  fieldsToShow,
  fieldDisplayConfig = {},
  className,
}) => {
  //Definir expansión del icon svg por booleanos
  const [expanded, setExpanded] = useState(true);
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
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
      className={`flex flex-col p-8 border-px border-solid border-white shadow-md rounded-lg
     shadow-gray-400 bg-white m-4 space-y-1   w-fit flex-grow
     ${expanded ? "" : "h-fit"} ${className}`}
    >
      <div className="flex justify-between" onClick={toggleExpansion}>
        <h4 className="text-xl">{title}</h4>
        <h1>
          <svg
            width="30"
            height="30"
            style={{ transform: !expanded ? "rotate(180deg)" : "rotate(0deg)" }} // Rotación del SVG 
          >
            <polygon points="15,20 5,10 25,10" fill="black" />
          </svg>
        </h1>
      </div>
      <div className="my-4 w-full h-px bg-slate-500"></div>
      {/* Contracción del área bajo la línea segun clic en svg */}
      <div
        className={`grid grid-cols-1 gap-1  ${
          expanded ? "" : "hidden"
        } transition-opacity duration-800 ${fieldsToShow.length > 4 ? "grid-cols-2" : ""} ${fieldsToShow.length > 12 ? "lg:grid-cols-3" : ""}`}
      >
        {fieldsToShow.map((field, index) => {
          const formattedFieldName = convertFieldName(field);
          const fieldValue = getNestedFieldValue(data, field.split("."));
          const fieldConfig = fieldDisplayConfig[field] || {}; // Configuración de visualización para el campo

          const label = fieldConfig.label || field;
          const shouldStringify = fieldConfig.stringify || false;
          //Renderizado si es checkbox
          if (fieldConfig.isCheckBox) {
            return (
              <div key={index} className="mb-1">
                <label>
                  {label}:
                  <input
                    type="checkbox"
                    checked={!!fieldValue}
                    readOnly
                    className="ml-1"
                  />
                </label>
              </div>
            );
          }

          // Renderizado si no es un checkbox
          return (
            <p key={index} className="mb-1">
              {shouldStringify ? label : formattedFieldName}:{" "}
              {typeof fieldValue === "object"
                ? JSON.stringify(fieldValue)
                : fieldValue}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
