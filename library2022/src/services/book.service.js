import httpClient from '../http-common';
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/';

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (data) => {
  // return httpClient.post('', data);
  return axios.post(baseUrl,data);
};
const bookByTitle = (title) => {
  // return httpClient.post('', data);
  return axios.get(baseUrl+"title/"+title);
};
const bookByAuthor = (author) => {
  // return httpClient.post('', data);
  return axios.get(baseUrl+"author/"+author);
};
const get = (id) => {
  return axios.get(baseUrl + id);
};

const update = (data) => {
  return axios.put(baseUrl, data);
};

const remove = (id) => {
  return axios.delete(baseUrl + `${id}`);
};
export default { getAll, create, get, update, remove ,bookByTitle,bookByAuthor};
