import styled from '@emotion/styled';
import { Box, Card, CardContent, Typography } from '@mui/material';
import Layout from 'components/Layout';
import { Link } from 'react-router-dom';

const HOMER_GO_BACK =
  'https://img2.thejournal.ie/inline/4188077/original/?width=480&version=4188077';

const StyledHomerBack = styled.img`
  border-radius: 6px;
`;

export const NotFound = () => (
  <Layout>
    <Card>
      <CardContent sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <StyledHomerBack src={HOMER_GO_BACK} />

        <Box
          padding={3}
          display='flex'
          alignItems='flex-start'
          flexDirection='column'
        >
          <Typography variant='h2'>Ooops page not found</Typography>

          <Link to='/table'>Redirect to table</Link>
        </Box>
      </CardContent>
    </Card>
  </Layout>
);
