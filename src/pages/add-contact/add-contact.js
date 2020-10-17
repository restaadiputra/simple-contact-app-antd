import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { message } from 'antd';

import ContactForm from 'components/shared/form';
import { createContact } from 'services/contact';

function AddContact() {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const backToList = () => {
    history.push('/');
  };

  const onFinish = (values) => {
    setLoading(true);
    createContact(values)
      .then(() => {
        setLoading(false);
        history.push('/');
      })
      .catch((error) => {
        setLoading(false);
        message.error(error?.response?.data?.message || 'Something went wrong');
      });
  };

  return (
    <ContactForm
      title="Add Contact"
      backToList={backToList}
      onFinish={onFinish}
      loading={loading}
      submitText="Add"
    />
  );
}

AddContact.propTypes = {};

export default AddContact;
