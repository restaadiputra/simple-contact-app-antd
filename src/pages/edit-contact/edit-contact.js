import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { message } from 'antd';

import ContactForm from 'components/shared/form';
import { getContactById, updateContactById } from 'services/contact';

function EditContact() {
  const history = useHistory();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(false);
  const [allowCancel, setAllowCancel] = useState(false);
  const [data, setData] = useState(null);

  const onFinish = (values) => {
    setLoading(true);
    updateContactById(params.id, values)
      .then(() => {
        setLoading(false);
        message.success('One contact has been updated');
        history.push('/');
      })
      .catch((error) => {
        setLoading(false);
        setAllowCancel(true);
        message.error(error?.response?.data?.message || 'Something went wrong');
      });
  };

  const backToList = () => {
    history.push('/');
  };

  useEffect(() => {
    setDisable(true);
    getContactById(params?.id)
      .then((res) => {
        setDisable(false);
        setData(res);
      })
      .catch((error) => {
        setLoading(false);
        setDisable(true);
        message.error(error?.response?.data?.message || 'Something went wrong');
      });
  }, [params.id]);

  return (
    <ContactForm
      data={data}
      title="Edit Contact"
      backToList={backToList}
      onFinish={onFinish}
      loading={loading}
      disable={disable}
      submitText="Edit"
      allowCancel={allowCancel}
    />
  );
}

export default EditContact;
