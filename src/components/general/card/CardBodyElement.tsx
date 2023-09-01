import { NestedObject } from "../../../interfaces/Interfaces";


interface CardProps {
  isCheckBox: boolean;
  fieldValue: string | NestedObject | undefined;
  label: string;
  shouldStringify: boolean;
  formattedFieldName: string;
}

const CardBodyElement: React.FC<CardProps> = ({
  isCheckBox,
  fieldValue,
  label,
  shouldStringify,
  formattedFieldName,
}) => {
  if(typeof fieldValue === "object")
  {
   fieldValue = JSON.stringify(fieldValue); 
  }
  //console.log(fieldValue);
  if (isCheckBox) {
    const isChecked = fieldValue === "true";
    return (
      <div className="mb-1 text-sm break-words">
        <label className="font-semibold text-lg text-blue-900 ">
          <input
            type="checkbox"
            checked={isChecked}
            readOnly
            className="form-checkbox  text-green-500 border-gray-300 rounded"
          />{" "}
          {label}
        </label>
      </div>
    );
  }

  return (
    <div className="text-sm grid grid-rows-1 -space-y-2">
      <span className="  font-semibold text-lg text-blue-900 ">
      {typeof fieldValue === "string"
        ? fieldValue.toUpperCase()
        : JSON.stringify(fieldValue)}
      </span>
      <span className="  text-blue-1100 font-light">
        {shouldStringify ? label : formattedFieldName}
      </span>
    </div>
  );
};

export default CardBodyElement;
