import { Snackbar, Alert } from '@mui/material';

const Error = ({ toggle, children }) => {
  return (
    <Snackbar open={toggle}>
      <Alert severity="error">{children}</Alert>
    </Snackbar>
  );
};

export default Error;
