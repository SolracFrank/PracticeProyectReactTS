import React from "react";
//Interface for Nested Objects 
type NestedObject = {
  [key: string]: string | NestedObject; //{(key:string) : value:string or {(key:string) : value:string or {...}}}
}
interface CardProps {
  title: string;
  data: NestedObject;
  fieldsToShow: string[];
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  data,
  fieldsToShow,
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
          const fieldValue = getNestedFieldValue(data, field.split("."));

          return (
            <p key={index} className="mb-1">
              {field}:{" "}
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
