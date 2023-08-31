import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth, AuthContext } from "./moduls/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

const queryClient = new QueryClient();

function App() {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col justify-self-center items-center h-full">
          <RouterProvider router={router} />
        </div>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
