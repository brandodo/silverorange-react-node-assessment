import { Box, Button, Typography } from '@mui/material';
import FilterButton from './FilterButton';

const FilterBar = ({ data, clickHandler }) => {
  // Determine how many buttons are required based on unique languages
  const temp = data.map((repo) => repo.language);
  const languages = temp.filter(
    (language, index, self) => self.indexOf(language) === index
  );

  // Create buttons for each unique language
  const buttons = languages.map((lang) => (
    <FilterButton
      key={`${lang}-btn`}
      language={lang}
      clickHandler={clickHandler}
    />
  ));
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        m: '25px',
      }}
    >
      <Typography variant="h6">Filter by language:</Typography>
      {buttons}
      <Button variant="outlined" onClick={() => clickHandler('')}>
        Reset
      </Button>
    </Box>
  );
};

export default FilterBar;
