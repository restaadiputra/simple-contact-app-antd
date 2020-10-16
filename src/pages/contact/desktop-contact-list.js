import React from 'react';
import PropTypes from 'prop-types';
import { Table, Avatar } from 'antd';

import ActionMenu from './action-menu';

const columns = (onEdit, onDelete) => [
  {
    title: 'Photo',
    dataIndex: 'photo',
    render: (photo) => {
      return <Avatar src={photo} size="large" />;
    },
  },
  { title: 'First Name', dataIndex: 'firstName' },
  { title: 'Last Name', dataIndex: 'lastName' },
  {
    title: 'Age',
    dataIndex: 'age',
    render: (age) => `${age} years old`,
  },
  {
    title: 'Action',
    dataIndex: '',
    align: 'right',
    render: (_, record) => (
      <ActionMenu
        onEdit={() => onEdit(record.id)}
        onDelete={() => onDelete(record.id)}
      />
    ),
  },
];

function DesktopContactList({ data, onEdit, onDelete, loading }) {
  const addKey = (data) => data.map((item) => ({ key: item.id, ...item }));

  return (
    <Table
      columns={columns(onEdit, onDelete)}
      dataSource={addKey(data)}
      pagination={false}
      loading={loading}
    />
  );
}

DesktopContactList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      age: PropTypes.number,
      photo: PropTypes.string,
    })
  ),
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default DesktopContactList;
