import { CSSReset, ChakraProvider, ColorModeScript, Flex, extendTheme } from '@chakra-ui/react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import Navbar from './layouts/Navbar';
import theme from './theme';

const Layout = () => {
  return (
    <>
      <Flex
        minH="100vh"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Navbar/>
        <Outlet/>
        <Footer/>
      </Flex>
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
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <div className="app" >
          <RouterProvider router={router} />
      </div>
    </ChakraProvider>
  );
}

export default App;
