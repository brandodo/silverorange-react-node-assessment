import { Router, Request, Response } from 'express';
import axios from 'axios';
import fs from 'fs';
import { Repo } from '../models/Repo';

export const repos = Router();

const REPO_DATA = './data/repos.json';

repos.get('/', async (_: Request, res: Response) => {
  // TODO: See README.md Task (A). Return repo data here. You’ve got this!

  // Fetch data from Github API and write to json file
  const { data } = await axios.get<Repo[]>(
    'https://api.github.com/users/silverorange/repos'
  );

  fs.writeFile(REPO_DATA, JSON.stringify(data), (err) => {
    if (err) throw err;

    console.log('Repo has been updated!');

    // Filter out repos where fork = false, send data to client
    fs.readFile(REPO_DATA, 'utf-8', (err, data) => {
      if (err) throw err;

      const currentData = JSON.parse(data);
      const filteredData = currentData.filter(
        (repo: Repo) => repo.fork === false
      );

      res.header('Cache-Control', 'no-store');
      res.header('Content-Type', 'application/json');
      res.status(200);
      res.json(filteredData);
    });
  });
});
