import Repo from './Repo';
import { Box } from '@mui/material';

const RepoList = ({ data, lang, clickHandler }) => {
  const repoList = lang
    ? data
        .filter((repo) => repo.language === lang)
        .map((repo) => (
          <Repo key={repo.id} data={repo} clickHandler={clickHandler} />
        ))
    : data.map((repo) => (
        <Repo key={repo.id} data={repo} clickHandler={clickHandler} />
      ));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        paddingBottom: '30px',
      }}
    >
      {repoList}
    </Box>
  );
};

export default RepoList;
