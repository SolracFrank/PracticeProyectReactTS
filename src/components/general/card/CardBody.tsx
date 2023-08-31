import CardBodyElement from "./CardBodyElement";
import { NestedObject } from "../../../interfaces/interfaces";

interface FieldDisplayConfig {
  [fieldName: string]: {
    label: string;
    stringify?: boolean;
    isCheckBox?: boolean;
  };
}

interface CardProps {
  expanded: boolean;
  data: NestedObject | string;
  fieldsToShow: string[];
  fieldDisplayConfig?: FieldDisplayConfig;
  className?: string;
}

//Converts exampleWordString to Example Word String
const convertFieldName = (name: string): string => {
  const words = name.split(/(?=[A-Z])/); //Regex to separate strings into a Array by upper case. exampleWordString -> ['example','Word','String']
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
  //Gets a nested object, a string value or an undefined.
  const getNestedFieldValue = (
    obj: NestedObject | string,
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
      className={`grid grid-cols-1 gap-1 
      ${expanded ? "" : "hidden"}  
      ${fieldsToShow.length > 4 ? "md:grid-cols-2" : ""} 
      ${
        fieldsToShow.length > 12
          ? "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:space-y-4"
          : ""
      }
      `}
    >
      {fieldsToShow.map((field, index) => {
        const formattedFieldName = convertFieldName(field);
        const fieldValue = getNestedFieldValue(data, field.split("."));
        const fieldConfig = fieldDisplayConfig[field] || {};
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
