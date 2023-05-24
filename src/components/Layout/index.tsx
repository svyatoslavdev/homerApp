import { Box } from "@mui/material";

const Layout = ({ children }) => (
  <Box padding={2} marginTop={16} height="100vh">
    {children}
  </Box>
);

export default Layout;
