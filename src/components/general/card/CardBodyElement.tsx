type NestedObject = {
  [key: string]: string | NestedObject;
};

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
    <div className="mb-1 text-sm grid grid-rows-1 leading-3">
      <span className="break-words font-semibold text-lg text-blue-900 flex-col">
        {typeof fieldValue === "object"
          ? JSON.stringify(fieldValue)
          : fieldValue?.toUpperCase()}
      </span>
      <span className="break-words text-blue-1100 font-light">
        {shouldStringify ? label : formattedFieldName}
      </span>
    </div>
  );
};

export default CardBodyElement;
