import api from 'utils/api';
import MockAdapter from 'axios-mock-adapter';

import {
  getAllContact,
  getContactById,
  createContact,
  updateContactById,
  deleteContactById,
} from './contact';

const mock = new MockAdapter(api);

test('should fetch all contact', (done) => {
  const data = {
    message: 'Get contacts',
    data: [
      {
        id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
        firstName: 'Luke',
        lastName: 'Skywalker',
        age: 20,
        photo: 'N/A',
      },
      {
        firstName: 'First',
        lastName: 'Last',
        age: 99,
        id: '247b1c70-0fb4-11eb-b5a6-f5d60a293237',
        photo: 'N/A',
      },
    ],
  };
  mock.onGet('/contact').reply(200, data);

  getAllContact().then(({ data }) => {
    expect(data).toStrictEqual(data);
    done();
  });
});

test('should fetch contact by id', (done) => {
  const data = {
    message: 'Get Contact by id',
    data: {
      id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Luke',
      lastName: 'Skywalker',
      age: 20,
      photo: 'N/A',
    },
  };

  mock.onGet(`/contact/${data.data.id}`).reply(200, data);

  getContactById(data.data.id).then(({ data }) => {
    expect(data).toStrictEqual(data);
    done();
  });
});

test('should create contact', (done) => {
  const data = {
    firstName: 'Luke',
    lastName: 'Skywalker',
    age: 20,
    photo: 'N/A',
  };

  mock.onPost(`/contact`, data).reply(200, data);

  createContact(data).then(({ data }) => {
    expect(data).toStrictEqual(data);
    done();
  });
});

test('should update contact by id', (done) => {
  const data = {
    message: 'Contact edited',
    data: {
      id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
      firstName: 'Luke',
      lastName: 'Skywalker',
      age: 20,
      photo: 'N/A',
    },
  };

  mock.onPut(`/contact/${data.data.id}`, data.data).reply(200, data);

  updateContactById(data.data.id, data.data).then(({ data }) => {
    expect(data).toStrictEqual(data);
    done();
  });
});

test('should delete contact by id', (done) => {
  const data = {
    message: 'Delete Contact by id',
    data: {
      id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
    }
  };

  mock.onDelete(`/contact/${data.data.id}`).reply(200, data);

  deleteContactById(data.data.id).then(({ data }) => {
    expect(data).toStrictEqual(data);
    done();
  });
});
