import { FC } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AppBar, Avatar, Box } from '@mui/material';
import { daysNumbers } from './constants';

const HOMER_IMAGE_URL =
  'https://i.pinimg.com/originals/66/e6/23/66e6230aa7ce7107f9707493dee0d9ba.png';

const getDrinkCheck = () => {
  const todayDate = new Date().getDay();

  if (daysNumbers.hasOwnProperty(todayDate)) {
    return daysNumbers[todayDate as keyof typeof daysNumbers];
  }

  return 'Weekdays, no beer today, unfortunately';
};

const Header: FC = () => (
  <AppBar>
    <Toolbar sx={{ borderBottom: 1, borderColor: 'divider', padding: 1 }}>
      <Avatar sx={{ width: 100, height: 100 }} src={HOMER_IMAGE_URL} />

      <Box
        display='flex'
        paddingLeft={1}
        width='100%'
        justifyContent='space-between'
      >
        <Typography variant='h3' component='div' sx={{ flexGrow: 1 }}>
          Beer app
        </Typography>

        <Typography
          variant='h6'
          component='div'
          display='flex'
          justifyContent='end'
          alignItems='center'
          sx={{ flexGrow: 1 }}
        >
          {getDrinkCheck()}
        </Typography>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Header;
