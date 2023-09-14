import { ChakraProvider } from '@chakra-ui/react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Navbar from './layouts/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      }
    ]
  },
]);

function App() {
  return (
    <ChakraProvider>
      <div className="app" >
          <RouterProvider router={router} />
      </div>
    </ChakraProvider>
  );
}

export default App;
