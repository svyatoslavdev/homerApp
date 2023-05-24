import Header from 'components/Header';
import { BeersTable } from 'pages/BeersTable/BeersTable';
import { Outlet, createBrowserRouter } from 'react-router-dom';

//TODO implement error boundaries and 404 or redirect to page
export const router = createBrowserRouter([
  {
    path: 'beer',
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        path: 'table/*',
        index: true,
        element: (
          <>
            <BeersTable />
            <Outlet />
          </>
        ),
      },
    ],
  },
]);
