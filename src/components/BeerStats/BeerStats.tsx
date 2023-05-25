import SportsBarIcon from '@mui/icons-material/SportsBar';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Box,
} from '@mui/material';
import { Chart } from 'components/Chart/Chart';
import { Loader } from 'components/Loader/Loader';
import { IBeer } from 'hooks/useTable';
import qs from 'qs';
import { FC, SyntheticEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface IBeerStats {
  beers: IBeer[] | undefined;
}

export const BeerStats: FC<IBeerStats> = ({ beers }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isOpenStats = qs.parse(searchParams.toString()).isOpenStats;

  const handleChangeAccordion = (
    _event: SyntheticEvent,
    isExpanded: boolean,
  ): void => {
    setSearchParams(prev =>
      qs.stringify({
        ...qs.parse(prev.toString()),
        isOpenStats: isExpanded ? 'open' : '',
      }),
    );
  };

  const handleOpenBeerModal = (beer: IBeer): void =>
    navigate(
      { search: `${searchParams.toString()}&beerId=${beer.id}` },
      { replace: true },
    );

  return (
    <Accordion
      expanded={!!isOpenStats}
      onChange={handleChangeAccordion}
      sx={{ marginBottom: 2 }}
    >
      <AccordionSummary
        expandIcon={<SportsBarIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Typography>Beer stats</Typography>
      </AccordionSummary>

      <AccordionDetails>
        {beers ? (
          <Chart
            handler={handleOpenBeerModal}
            data={beers}
            dataKey='abv'
            titleKey='name'
          />
        ) : (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            width='100%'
            height={300}
          >
            <Loader isLoading={!beers} />
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
