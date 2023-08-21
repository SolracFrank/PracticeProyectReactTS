import React from "react";
//Interface for Nested Objects 
type NestedObject = {
  [key: string]: string | NestedObject; //{(key:string) : value:string or {(key:string) : value:string or {...}}}
}
interface FieldDisplayConfig {
  [fieldName: string]: {
    label: string;
    stringify?: boolean;
  };
}

interface CardProps {
  title: string;
  data: NestedObject;
  fieldsToShow: string[];
  fieldDisplayConfig?: FieldDisplayConfig; // Nueva prop para configuración de visualización
  className?: string;
}
//Converts 'camelCase' to 'Camel Case' 
const convertFieldName = (name: string): string => {
  const words = name.split(/(?=[A-Z])/); // Split by capital letters
  const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  return formattedWords.join(" ");
};

const Card: React.FC<CardProps> = ({
  title,
  data,
  fieldsToShow,
  fieldDisplayConfig = {}, // Valor por defecto: ningún formato especial
  className,
}) => {
  //Get nested value (if exist)
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

          return (
            <p key={index} className="mb-1">
            {shouldStringify ? label : formattedFieldName}:{" "}
              {typeof fieldValue === "object"
                ? JSON.stringify(fieldValue)
                : fieldValue}
            </p> //
          );
        })}
      </div>
    </div>
  );
};

export default Card;
