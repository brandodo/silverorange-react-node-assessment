import { Modal, Box, Typography, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';

const CommitModal = ({ toggle, data, clickHandler }) => {
  if (!toggle) {
    return '';
  }

  const { commit, read_me } = data;
  const { author, message } = commit;

  const style = {
    modal: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      display: 'flex',
      flexDirection: 'column',
      transform: 'translate(-50%, -50%)',
      width: 600,
      bgcolor: 'lightgrey',
      borderRadius: '10px',
      boxShadow: 24,
      p: 4,
      gap: 2,
    },
    button: {
      width: '50%',
      alignSelf: 'center',
    },
    markdown: {
      height: '200px',
      overflowY: 'scroll',
      borderRadius: '10px',
      backgroundColor: '#fff',
      p: 3,
    },
    text: {
      fontWeight: 700,
    },
  };

  return (
    <Modal open={toggle}>
      <Box sx={style.modal}>
        {/* Display readme markdown if it exist */}
        {read_me ? (
          <>
            <Typography sx={style.text}>README.MD:</Typography>
            <Box sx={style.markdown}>
              <ReactMarkdown children={read_me} />
            </Box>
          </>
        ) : (
          <Typography sx={style.text}>
            This repo does not have a README
          </Typography>
        )}
        <Typography sx={style.text}>
          Last commit was by {author.name} on{' '}
          {new Date(author.date).toDateString()}
        </Typography>
        <Typography variant="q" sx={{ fontStyle: 'italic' }}>
          <Typography sx={{ fontWeight: 700 }}>Message: </Typography>
          {message}
        </Typography>
        <Button
          sx={style.button}
          variant="outlined"
          onClick={() => clickHandler(false)}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default CommitModal;
