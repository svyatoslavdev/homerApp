import Header from 'components/Header';
import Layout from 'components/Layout';
import { Component, ReactNode } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

interface IErrorBoundaryProps {
  children: ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

const HOMER_ERROR = 'https://media.tenor.com/yyTPHle1YdQAAAAC/homer-brain.gif';

class ErrorBoundary extends Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError = error => {
    return { hasError: true };
  };

  render() {
    if (this.state.hasError) {
      return (
        <>
          <Header />
          <Layout>
            <Card>
              <CardContent sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <img src={HOMER_ERROR} />

                <Box
                  padding={3}
                  display='flex'
                  alignItems='flex-start'
                  flexDirection='column'
                >
                  <Typography variant='h2'>Oh no something wrond</Typography>
                </Box>
              </CardContent>
            </Card>
          </Layout>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
