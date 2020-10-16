import api from 'utils/api';
import get from 'lodash/get';

export const getAllContact = () =>
  api.get('/contact').then((res) => get(res, 'data.data', null));

export const getContactById = (id) =>
  api.get(`/contact/${id}`).then((res) => get(res, 'data.data', null));

export const createContact = (data) =>
  api.post(`/contact`, data).then((res) => res.data);
