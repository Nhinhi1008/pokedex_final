import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routers/Root';
import { ChakraProvider } from '@chakra-ui/react';
import Home from './routers/Home'; 
import Pokemon from './routers/Pokemon'; 
import './index.css';
import Search from './routers/Search';


const queryClient = new QueryClient({});

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'pokemon/search',
        element: <Search />,
      },
      {
        path: 'pokemon/:name',
        element: <Pokemon />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>
);
