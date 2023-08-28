type NestedObject = {
  [key: string]: string | NestedObject; // de la forma {(key:string) : value:string or {(key:string) : value:string or {...}}}
};

//Interfaz para las props de la card, incluye título, datos de la Api; qué datos mostraremos, etc.
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
    //Renderizado si es un checkbox
    const isChecked = fieldValue === "true"; // Convertir cadena a booleano
    return (
      <div className="mb-1 text-sm break-words">
        <label className="text-gray-500">
          <input type="checkbox" checked={isChecked} readOnly 
          className="form-checkbox  text-green-500 border-gray-300 rounded focus:ring-green-400" />{" "} 
          {label}
        </label>
      </div>
    );
  }

  // Renderizado si no es un checkbox
  return (
    <div className="mb-1 text-sm grid grid-cols-1 ">
    
      <span className="break-words font-bold text-blue-900 hover:text-green-600">
        {typeof fieldValue === "object"
          ? JSON.stringify(fieldValue)
          : fieldValue?.toUpperCase()}
      </span>
      <span className="break-words text-gray-500">
        {shouldStringify ? label : formattedFieldName}
      </span>
    </div>
  );
};

export default CardBodyElement;
