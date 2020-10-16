import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import MobileContactList from './mobile-contact-list';
import DesktopContactList from './desktop-contact-list';
import Fab from 'components/fab';
import { deleteContact, addContact } from 'store/contact';
import { getAllContact } from 'services/contact';

function Contact() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 640 });
  const contactData = useSelector(({ contact }) => contact);

  const { confirm } = Modal;

  const handleEdit = (id) => {
    history.push(`/edit/${id}`);
  };

  const handleAdd = () => {
    history.push('/add');
  };

  const handleDelete = (id) => {
    confirm({
      title: 'Delete contact?',
      icon: <ExclamationCircleOutlined />,
      content: 'These action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(deleteContact(id));
      },
      width: 300,
      centered: true,
      maskClosable: true,
    });
  };

  useEffect(() => {
    setLoading(true);
    getAllContact()
      .then(res => {
        console.log(res);
        setLoading(false);
        dispatch(addContact(res))
      })
      .catch(err => {
        setLoading(false);
        console.log(err)
      })
  }, [dispatch]);

  

  return (
    <>
      <Typography.Title level={2}>Contact</Typography.Title>
      {isMobile ? (
        <MobileContactList
          data={contactData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      ) : (
        <DesktopContactList
          data={contactData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      )}
      {isMobile && <Fab onClick={handleAdd} />}
    </>
  );
}

export default Contact;
