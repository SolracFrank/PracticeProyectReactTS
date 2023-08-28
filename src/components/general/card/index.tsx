import React, { useState } from "react";
import CardHeader from "./CardHeader.";
import CardBody from "./CardBody";

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
  fieldsToShow?: string[];
  fieldDisplayConfig?: FieldDisplayConfig;
  className?: string;
  component?: React.ReactNode;
}

//Componentes pa' la card
export const Card: React.FC<CardProps> = (
  { title, data, fieldsToShow, fieldDisplayConfig = {}, className, component }
) => {
  //Definir expansión del icon svg por booleanos
  const [expanded, setExpanded] = useState(true);
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
    fieldsToShow = fieldsToShow?.length === 0 ? Object.keys(data) : fieldsToShow;

  return (
    <div
      className={`flex-col p-8 border-px border-solid border-white shadow-md rounded-lg
   shadow-gray-400 bg-white space-y-1  w-full flex-grow  text-gray-600
   ${expanded ? "h-full" : "h-fit"} ${className}`} //Altura "full" si expandido, fit si contraído (como no hay nada, fit lo hace mínimo antes del title)
    >
      <div className="-space-y-0 group">
        <CardHeader
          title={title}
          toggleExpansion={toggleExpansion}
          expanded={expanded}
          className="group-hover:text-green-600"
        />
        <div className="my-4 w-full h-px bg-blue-500 group-hover:bg-green-500" />
      </div>
      {/* Contracción del área bajo la línea segun clic en svg */}
      <CardBody
        expanded={expanded}
        data={data}
        fieldsToShow={fieldsToShow || []}
        fieldDisplayConfig={fieldDisplayConfig}
      />

      {component && expanded && <div className="mt-4">{component}</div>}
    </div>
  );
};
