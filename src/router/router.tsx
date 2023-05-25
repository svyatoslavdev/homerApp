import Header from 'components/Header';
import { BeersTable } from 'pages/BeersTable/BeersTable';
import { NotFound } from 'pages/NotFound/NotFound';
import { Outlet, createBrowserRouter } from 'react-router-dom';

//TODO implement error boundaries and 404 or redirect to page
export const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <>
        <Header />
        <NotFound />
      </>
    ),
  },
  {
    path: 'table/*',
    index: true,
    element: (
      <>
        <Header />
        <BeersTable />
        <Outlet />
      </>
    ),
  },
]);
