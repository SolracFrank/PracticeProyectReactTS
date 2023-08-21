import { Form } from "../general/form/Form";
import Input from "../general/input/Input";

type Login = {
  email: string;
  password: string;
};

const FormLogin = () => {
  const onSubmit = (datos: Login) => {
    console.log(datos);
  };

  return (
    <div className=" w-full rounded-md border bg-white border-white  shadow-gray-400 shadow-2xl md:h-fit h-screen ">
      <div className="flex items-center justify-center my-2 ">
        <p className="text-lg font-bold text-gray-500 bg-white border border-gray-300 rounded-md lg:p-16 p-8">
          LOGO
        </p>
      </div>

      <div className="flex items-center justify-center">
        <Form<Login>
          onSubmit={onSubmit}
          className="w-full space-y-4 rounded-lg p-4 sm:p-6 lg:p-8"
        >
          {({ register }) => (
            <div className="text-center space-y-3 relative">
              <div className="h-px  bg-blue-800"></div>
              <Input
                {...register("email")}
                label="Email"
                placeholder="email"
                type="email"
              />
              <Input
                {...register("password")}
                label="Password"
                placeholder="password"
                type="password"
              />
              <div className="h-px  w-full bg-blue-800"></div>
              <button
                type="submit"
                className="block w-full rounded-lg border-none bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-1100"
              >
                Ingresar
              </button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};
export default FormLogin;
