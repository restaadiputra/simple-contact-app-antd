import { Typography } from 'antd';
import React from 'react';

import MobileContactList from './mobile-contact-list';

const data = [
  {
    id: '93ad6070-c92b-11e8-b02f-cbfa15db428b',
    firstName: 'Bilbo',
    lastName: 'Baggins',
    age: 111,
    photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
  {
    id: 'b3abd640-c92b-11e8-b02f-cbfa15db428b',
    firstName: 'Luke',
    lastName: 'Skywalker',
    age: 20,
    photo: 'N/A',
  },
  {
    id: '8f18cd70-0e97-11eb-b868-db7fb7b67712',
    firstName: 'First',
    lastName: 'Last',
    age: 99,
    photo: 'N/A',
  },
  {
    id: 'a0ff7980-0e97-11eb-b868-db7fb7b67712',
    firstName: 'Bilbo',
    lastName: 'Baggins',
    age: 111,
    photo: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  },
];

function Contact() {
  return (
    <>
      <Typography.Title level={2}>Contact</Typography.Title>
      <MobileContactList data={data} />
    </>
  );
}

export default Contact;
