import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Form, Input, Button, Card } from 'antd';
import styled from 'styled-components';

import { createContact } from 'services/contact';

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StyledCard = styled(Card)`
  @media screen and (max-width: 640px) {
    border: none;
    .ant-card-body {
      padding: 5px;
    }
  }
`

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
      <TitleContainer>
        <Typography.Title level={2}>Add Contact</Typography.Title>
      </TitleContainer>
      <StyledCard>
        <Form
          name="new-contact"
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
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
            <Input placeholder="your first name" disabled={loading} />
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
            <Input placeholder="your last name" disabled={loading} />
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
              {
                pattern: /^(100|[1-9][0-9]?)$/,
                message: 'Age must be larger than 0 and less or equal to 100',
              },
            ]}
          >
            <Input placeholder="your age name" disabled={loading} />
          </Form.Item>
          <Form.Item label="Photo" name="photo">
            <Input
              placeholder="your link to your photo profile"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '1rem' }}
              loading={loading}
            >
              Submit
            </Button>
            <Button
              type="default"
              style={{ marginLeft: '1rem' }}
              onClick={backToList}
              disabled={loading}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </>
  );
}

AddContact.propTypes = {};

export default AddContact;
