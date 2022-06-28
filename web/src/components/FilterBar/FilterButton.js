import { Button } from '@mui/material';

const FilterButton = ({ language, clickHandler }) => {
  return (
    <Button variant="contained" onClick={() => clickHandler(language)}>
      {language}
    </Button>
  );
};

export default FilterButton;
