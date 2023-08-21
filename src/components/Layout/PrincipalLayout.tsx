import { Outlet } from "react-router-dom";

const PrincipalLayout = () => {
  return (
    <div className="flex w-full  h-screen px-4 py-10 sm:px-6 lg:px-8 justify-center bg-gray-100">
      <Outlet />
        
    </div>
  );
};
export default PrincipalLayout;
