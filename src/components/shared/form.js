import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Form, Input, Button, Card } from 'antd';
import styled from 'styled-components';

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const StyledCard = styled(Card)`
  @media screen and (max-width: 640px) {
    border: none !important;
    .ant-card-body {
      padding: 5px;
    }
  }
`;

function ContactForm({
  loading,
  disable,
  onFinish,
  backToList,
  submitText,
  title,
  data,
}) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <>
      <TitleContainer>
        <Typography.Title level={2}>{title}</Typography.Title>
      </TitleContainer>
      <StyledCard>
        <Form
          name="new-contact"
          onFinish={onFinish}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          form={form}
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
              {
                min: 3,
                message: 'First name must be 3 or more letters'
              }
            ]}
          >
            <Input
              placeholder="your first name"
              disabled={loading || disable}
            />
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
                message: 'Last name can only alphanumeric',
              },
              {
                min: 3,
                message: 'Last name must be 3 or more letters'
              }
            ]}
          >
            <Input placeholder="your last name" disabled={loading || disable} />
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
            <Input placeholder="your age" disabled={loading || disable} />
          </Form.Item>
          <Form.Item label="Photo" name="photo">
            <Input
              placeholder="your link to your photo profile"
              disabled={loading || disable}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: '1rem' }}
              disabled={disable}
              loading={loading}
            >
              {submitText}
            </Button>
            <Button
              type="default"
              style={{ marginLeft: '1rem' }}
              onClick={backToList}
              disabled={loading || disable}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </StyledCard>
    </>
  );
}

ContactForm.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    age: PropTypes.number,
    photo: PropTypes.string,
  }),
  submitText: PropTypes.string,
  title: PropTypes.string,
  loading: PropTypes.bool,
  disable: PropTypes.bool,
  onFinish: PropTypes.func,
  backToList: PropTypes.func,
};

export default ContactForm;
