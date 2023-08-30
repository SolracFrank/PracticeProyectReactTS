import React, { useState } from "react";
import CardHeader from "./CardHeader.";
import CardBody from "./CardBody";

type NestedObject = {
  [key: string]: string | NestedObject; // {(key:string) : value:string or {(key:string) : value:string or {...}}}
};

interface FieldDisplayConfig {
  [fieldName: string]: {
    label: string; 
    stringify?: boolean; 
    isCheckBox?: boolean; 
  };
}interface CardProps {
  title: string;
  data: NestedObject;
  fieldsToShow?: string[];
  fieldDisplayConfig?: FieldDisplayConfig;
  className?: string;
  component?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  data,
  fieldsToShow = [],
  fieldDisplayConfig = {},
  className,
  component,
}) => {
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
   ${expanded ? "h-full" : "h-fit"} ${className}`} 
    >
      <div className="-space-y-0 mb-4 group border-b-[3px] border-green-1100">
        <CardHeader
          title={title}
          toggleExpansion={toggleExpansion}
          expanded={expanded}
        />

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
