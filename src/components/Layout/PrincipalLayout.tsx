import { Outlet } from "react-router-dom";
//import { useGetDataQuery } from "../hooks/useCache";

const PrincipalLayout = () => {
  // const { isLoading, isError } = useGetDataQuery({
  //   api: 'https://localhost:7075/api/employees',
  //   apiKey: 'usuarios',
  //   cacheTime: 86400000, 
  //   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyZTlkOTkxMC02YmE3LTRkMjAtOGE2NS0wOGQ5ZTRkNTI2MzIiLCJBY3RpdmUiOiJUcnVlIiwibmJmIjoxNjk0MjAyMDg2LCJleHAiOjE2OTQyMDU2ODYsImlzcyI6Imh0dHA6Ly8yMDEuMTYxLjgwLjExMiIsImF1ZCI6IjUzMmE2ZjZhLWZmNDktNDU2OC04Yzk0LTQ0ZDVmYjlhYjdlNyJ9.dINd0gFafwzcgqkpH7GK2IG6khaCjlsOHsBxQRDoOz0"
  // });
  // console.log('error' + isError + 'loading: '+isLoading)
  return (
    <div className="flex w-full  min-h-screen h-full px-4 py-10 sm:px-6 lg:px-8 justify-center">
      <Outlet />
        
    </div>
  );
};
export default PrincipalLayout;
