import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import FilterBar from './components/FilterBar/FilterBar';
import RepoList from './components/RepoList/RepoList';
import CommitModal from './components/CommitModal/CommitModal';
import './App.css';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export function App() {
  const [repos, setRepos] = useState([]);
  const [lang, setLang] = useState('');
  const [latestCommit, setLatestCommit] = useState({});
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(API_URL);

    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    setRepos(data);
  };

  const getLastCommit = async (id) => {
    const selectedRepo = repos.find((repo) => repo.id === id);
    const { data } = await axios.get(`${selectedRepo.url}/commits`);
    const lastCommit = data.reduce((a, b) =>
      new Date(a.commit.author.date) > new Date(b.commit.author.date) ? a : b
    );

    const readmeFile = await getReadme(selectedRepo);
    lastCommit.read_me = readmeFile;

    setLatestCommit(lastCommit);
    setShow(true);
  };

  const getReadme = async (repo) => {
    const readmeUrl = `https://raw.githubusercontent.com/${repo.full_name}/master/README.md`;
    try {
      const { data } = await axios.get(readmeUrl);
      return data ? data : '';
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Header />
      <FilterBar data={repos} clickHandler={setLang} />
      <RepoList data={repos} lang={lang} clickHandler={getLastCommit} />
      <CommitModal toggle={show} data={latestCommit} clickHandler={setShow} />
    </div>
  );
}
