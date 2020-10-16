import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Modal, message, Button } from 'antd';
import { ExclamationCircleOutlined, UserAddOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import MobileContactList from './mobile-contact-list';
import DesktopContactList from './desktop-contact-list';
import Fab from 'components/fab';
import { deleteContact, replaceContact } from 'store/contact';
import { getAllContact, deleteContactById } from 'services/contact';

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

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

  const handleDeleteContact = (id) => {
    deleteContactById(id)
      .then(() => {
        dispatch(deleteContact(id));
      })
      .catch((error) => {
        message.error(error?.response?.data?.message || 'Something went wrong');
      });
  };

  const handleClickDelete = (id) => {
    confirm({
      title: 'Delete contact?',
      icon: <ExclamationCircleOutlined />,
      content: 'These action cannot be undone',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDeleteContact(id);
      },
      width: 300,
      centered: true,
      maskClosable: true,
    });
  };

  useEffect(() => {
    setLoading(true);
    getAllContact()
      .then((res) => {
        console.log(res);
        setLoading(false);
        dispatch(replaceContact(res));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, [dispatch]);

  return (
    <>
      <TitleContainer>
        <Typography.Title level={2}>Contact</Typography.Title>
        {!isMobile && (
          <Button type="primary" icon={<UserAddOutlined />} onClick={handleAdd}>
            Add Contact
          </Button>
        )}
      </TitleContainer>
      {isMobile ? (
        <MobileContactList
          data={contactData}
          onEdit={handleEdit}
          onDelete={handleClickDelete}
          loading={loading}
        />
      ) : (
        <DesktopContactList
          data={contactData}
          onEdit={handleEdit}
          onDelete={handleClickDelete}
          loading={loading}
        />
      )}
      {isMobile && <Fab onClick={handleAdd} />}
    </>
  );
}

export default Contact;
