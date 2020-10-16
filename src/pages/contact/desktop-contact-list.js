import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';

import ActionMenu from './action-menu';

const columns = (onEdit, onDelete) => [
  {
    title: 'Photo',
    dataIndex: 'photo',
    render: (photo) => {
      return (
        <>
          <div
            style={{
              backgroundImage: `url(${photo})`,
              backgroundColor: '#fff',
              height: '50px',
              width: '50px',
              borderRadius: '50%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          />
        </>
      );
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

function DesktopContactList({ data, onEdit, onDelete }) {
  const addKey = (data) => data.map((item) => ({ key: item.id, ...item }));

  return (
    <Table
      columns={columns(onEdit, onDelete)}
      dataSource={addKey(data)}
      pagination={false}
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
