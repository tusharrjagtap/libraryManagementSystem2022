import httpClient from '../http-common';
import axios from 'axios';

const baseUrl = 'http://localhost:8080/api/users/';

const getAll = () => {
  return axios.get(baseUrl);
};

const create = (data) => {
  // return httpClient.post('', data);
  return axios.post(baseUrl,data);
};
const AllIssuedBookByUser = (data) => {
  // return httpClient.post('', data);
  return axios.get(baseUrl+'issuebook',data);
};
const issueBookByUser = (uid,bid) => {
  // return httpClient.post('', data);
  return axios.post(baseUrl+'issue/'+uid+'/'+bid);
};
const renewBook = (iid) => {
  // return httpClient.post('', data);
  return axios.put(baseUrl+"renew/"+iid);
};
const returnBook = (iid) => {
  // return httpClient.post('', data);
  return axios.post(baseUrl+"return/"+iid);
};
const reset = (data) => {
  // return httpClient.post('', data);
  return axios.post(baseUrl+"reset",data);
};
const login = (data) => {
  // return httpClient.post('', data);
  return axios.post(baseUrl+"login",data);
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
export default { getAll, create, get, update, remove, login,reset,issueBookByUser,renewBook,AllIssuedBookByUser,returnBook};
