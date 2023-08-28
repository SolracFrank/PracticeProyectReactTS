import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./components/pages/Index";
import Navbar from "./components/general/Navbar";
import PrincipalLayout from "./components/Layout/PrincipalLayout";
import Login from "./components/pages/Login";
import UserProvider from "./components/context/UserProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import Contact from "./components/pages/Contact";

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<PrincipalLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/*"
                  element={
                    <h1 className="text-xl bold text-gray-500">
                      404 Not Found
                    </h1>
                  }
                />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserProvider>
      </QueryClientProvider>
    </div>
  );
};
export default App;
