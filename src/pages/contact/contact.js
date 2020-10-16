import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Typography, Modal } from 'antd';
import { useHistory } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import MobileContactList from './mobile-contact-list';
import DesktopContactList from './desktop-contact-list';

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
  const history = useHistory();
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const { confirm } = Modal;

  const handleEdit = (id) => {
    history.push(`/${id}`);
  };

  const handleDelete = (id) => {
    console.log(id);
    confirm({
      title: 'Delete contact?',
      icon: <ExclamationCircleOutlined />,
      content: 'These action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK', id);
      },
      onCancel() {
        console.log('Cancel');
      },
      width: 300,
      centered: true,
      maskClosable: true,
    });
  };

  return (
    <>
      <Typography.Title level={2}>Contact</Typography.Title>
      {isMobile ? (
        <MobileContactList
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <DesktopContactList
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default Contact;
