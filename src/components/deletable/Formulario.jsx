import { useForm } from "react-hook-form";
import InputP from "./InputP";

const Form = () => {
  const { handleSubmit, register } = useForm();
  function OnSubmit(imprimir) {
    console.log(imprimir);
  }

  return (
    <form onSubmit={handleSubmit(OnSubmit)}>
      <InputP
        type="text"
        name="Username"
        label="Add Username"
        placeholder="Add your username"
        {...register("email")}
      />
      <InputP
        type="password"
        name="Password"
        label="Add password"
        placeholder="Add your password"
        {...register("password")}
      />
      <button type="submit"></button>
    </form>
  );
};

export default Form;
