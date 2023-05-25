import { FC, ReactNode } from 'react';
import { Box } from '@mui/material';
import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';

const Layout: FC<{ children: ReactNode }> = ({ children }) => (
  <ErrorBoundary>
    <Box padding={2} marginTop={16} height='100vh'>
      {children}
    </Box>
  </ErrorBoundary>
);

export default Layout;
