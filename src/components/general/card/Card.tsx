import React from "react";
//Interface para objetos anidados
type NestedObject = {
  [key: string]: string | NestedObject; // de la forma {(key:string) : value:string or {(key:string) : value:string or {...}}}
}
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
//Convierte 'camelCase' to 'Camel Case'; En caso de que no usemos "FieldDisplayConfig"
const convertFieldName = (name: string): string => {
  const words = name.split(/(?=[A-Z])/); // Los separa con regex por Letra Mayus
  const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return formattedWords.join(" ");
};

const Card: React.FC<CardProps> = ({
  title,
  data,
  fieldsToShow,
  fieldDisplayConfig = {}, 
  className,
}) => {
  //Obtiene los objetos anidados (if exist)
  const getNestedFieldValue = (
    obj: NestedObject | undefined,
    path: string[]
  ): string | NestedObject | undefined => {
    return path.reduce<string | NestedObject | undefined>(
      (acc, key) =>
        acc && typeof acc === 'object' && key in acc ? acc[key] : undefined,
      obj
    );
  };

  return (
    <div
      className={`md:w-[70vh] p-4 justify-start flex flex-col border-px border-solid
       border-white shadow-md shadow-gray-400 sm:w-[40vh] bg-white mx-4  space-y-1 
       ${className}`}
    >
      <h4 className=" text-xl">{title}</h4>
      <div className="my-4 w-full h-px bg-slate-500"></div>
      <div>
        {fieldsToShow.map((field, index) => {
          const formattedFieldName = convertFieldName(field);
          const fieldValue = getNestedFieldValue(data, field.split("."));
          const fieldConfig = fieldDisplayConfig[field] || {}; // Configuración de visualización para el campo

          const label = fieldConfig.label || field;
          const shouldStringify = fieldConfig.stringify || false;

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
        
          // Renderizado estándar si no es un checkbox
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
