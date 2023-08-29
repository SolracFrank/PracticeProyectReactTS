import { Outlet } from "react-router-dom";

const PrincipalLayout = () => {
  return (
    <div className="flex w-full  min-h-screen h-full px-4 py-10 sm:px-6 lg:px-8 justify-center">
      <Outlet />
        
    </div>
  );
};
export default PrincipalLayout;
