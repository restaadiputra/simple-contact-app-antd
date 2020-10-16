import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Form, Input, Button } from 'antd';

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
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <Typography.Title level={2}>Add Contact</Typography.Title>
      <Form
        name="new-contact"
        onFinish={onFinish}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
            {
              pattern: /^[a-zA-Z0-9]*$/,
              message: 'First name can only alphanumeric',
            },
          ]}
        >
          <Input placeholder="your first name" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
            {
              pattern: /^[a-zA-Z0-9]*$/,
              message: 'First name can only alphanumeric',
            },
          ]}
        >
          <Input placeholder="your last name" />
        </Form.Item>
        <Form.Item
          label="Age"
          name="age"
          rules={[
            {
              required: true,
              message: 'Please input your age!',
            },
            {
              pattern: /^[+]?([.]\d+|\d+[.]?\d*)$/,
              message: 'Age can only be positive number',
            },
          ]}
        >
          <Input placeholder="your age name" />
        </Form.Item>
        <Form.Item label="Photo" name="photo">
          <Input placeholder="your link to your photo profile" />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '1rem',
            }}
          >
            <Button
              type="default"
              style={{ marginRight: '1rem' }}
              onClick={backToList}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: '1rem' }}
              loading={loading}
            >
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
}

AddContact.propTypes = {};

export default AddContact;
