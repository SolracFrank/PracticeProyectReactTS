import { DetailedHTMLProps, forwardRef } from "react";
type InputProps = DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
interface inputProps extends InputProps {
  label?: string;
  placeholder?: string;
  name: string;
}

const Input = forwardRef<HTMLInputElement, inputProps>((props, ref) => {
  const { placeholder, label, name, ...rest } = props;

  return (
    <div className="text-lg">
      <label>{label}</label>
      <div>
        <input
          className="p-2 border-blue-500 border rounded-md w-full"
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...rest}
        />
      </div>
    </div>
  );
});
export default Input;
