import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

const addEntry = (entry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, entry)
    .then((response) => response.data);
};

export default {
  getEntries,
  addEntry,
};
