import api from 'utils/api';
import MockAdapter from 'axios-mock-adapter';

import { getAllContact, getContactById } from './contact';

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
