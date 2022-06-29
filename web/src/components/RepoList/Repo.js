import { Box, Typography } from '@mui/material';
import Moment from 'react-moment';

const Repo = ({ data, clickHandler }) => {
  const { id, name, description, language, forks_count, created_at } = data;

  const style = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '15px',
      p: '15px',
      border: '2px solid #fff',
      borderRadius: '12px',
      width: '60%',
      transition: '0.2s all ease',
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#838383',
      },
    },
    description: {
      fontSize: '18px',
      fontStyle: 'italic',
    },
    textContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
  };
  
  return (
    <Box id={id} sx={style.container} onClick={() => clickHandler(id)}>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="p" sx={style.description}>
        {description ? description : 'No description'}
      </Typography>

      <Box sx={style.textContainer}>
        <Typography variant="p">
          Language:{' '}
          <Typography
            variant="span"
            sx={{ fontWeight: 700, fontStyle: 'italic' }}
          >
            {language}
          </Typography>
        </Typography>
        <Typography variant="p">Forks: {forks_count}</Typography>
        <Moment format="MMMM DD, YYYY">{created_at}</Moment>
      </Box>
    </Box>
  );
};

export default Repo;
