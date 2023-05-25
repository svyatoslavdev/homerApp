import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Layout from 'components/Layout';
import { BeerStats } from 'components/BeerStats/BeerStats';
import { TablePagination, TableSortLabel } from '@mui/material';
import { useTable } from 'hooks/useTable';
import { BeerTableRow } from './components/BeerTableRow';
import { BeerTableRowPlaceholder } from './components/BeerTableRowPlaceholder';
import { GetParameterPopups } from 'hocs/GetParameterPopups';

const PER_PAGE_OPTIONS = [5, 10, 25];

interface IHeadCell {
  id: string;
  label: string;
  numeric: boolean;
  sorted: boolean;
}

const TABLE_HEAD_COLUMNS: readonly IHeadCell[] = [
  {
    id: 'name',
    numeric: false,
    label: 'Name',
    sorted: false,
  },
  {
    id: 'tagline',
    numeric: false,
    label: 'Tagline',
    sorted: false,
  },
  {
    id: 'Photo',
    numeric: false,
    label: 'Photo',
    sorted: false,
  },
  {
    id: 'ABV',
    numeric: true,
    label: 'ABV',
    sorted: true,
  },
];

// Constants from https://github.com/sammdec/punkapi, request for get count i didn't found
const BEER_COUNT = 325;

export const BeersTable = () => {
  const [
    { data: beers, isLoading },
    { rowsPerPage, page, sortDirection, handleSearchParams },
  ] = useTable();

  const handleChangeSortDirection = () => {
    let currentDirection: 'asc' | 'desc' | undefined;

    if (sortDirection === 'asc') {
      currentDirection = 'desc';
    }

    if (sortDirection === 'desc') {
      currentDirection = undefined;
    }

    if (!sortDirection) {
      currentDirection = 'asc';
    }

    handleSearchParams('sortDirection', {
      sortDirection: currentDirection ?? '',
    });
  };

  return (
    <Layout>
      <BeerStats beers={beers} />

      <TableContainer sx={{ maxHeight: '70vh' }} component={Paper}>
        <Table stickyHeader sx={{ minWidth: 650 }} aria-label='beer table'>
          <TableHead>
            <TableRow>
              {TABLE_HEAD_COLUMNS.map(headCell => (
                <TableCell
                  width={`${100 / TABLE_HEAD_COLUMNS.length}%`}
                  key={headCell.id}
                >
                  {headCell.sorted ? (
                    <TableSortLabel
                      active={!!sortDirection}
                      direction={sortDirection}
                      onClick={handleChangeSortDirection}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {!isLoading &&
              beers &&
              beers.map(beer => <BeerTableRow key={beer.id} beer={beer} />)}

            {isLoading &&
              Array.from(rowsPerPage.toString().repeat(rowsPerPage)).map(
                (_, index) => <BeerTableRowPlaceholder key={index} />,
              )}
          </TableBody>
        </Table>
      </TableContainer>

      <GetParameterPopups />

      {!isLoading && (
        <TablePagination
          rowsPerPageOptions={PER_PAGE_OPTIONS}
          component='div'
          count={BEER_COUNT}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(_event, page) => handleSearchParams('page', page++)}
          onRowsPerPageChange={event =>
            handleSearchParams('rowsPerPage', +event.target.value)
          }
        />
      )}
    </Layout>
  );
};
