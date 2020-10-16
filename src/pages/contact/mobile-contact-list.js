import React from 'react';
import PropTypes from 'prop-types';
import { List, Avatar } from 'antd';
import styled from 'styled-components';

import ActionMenu from './action-menu';

const StyledListItemMeta = styled(List.Item.Meta)`
  .ant-avatar {
    width: 48px;
    height: 48px;
  }
`;

function ContactList({ data }) {
  const onEdit = (id) => {
    console.log('edit ' + id);
  };

  const onDelete = (id) => {
    console.log('delete ' + id);
  };

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <StyledListItemMeta
            avatar={<Avatar src={item.photo} />}
            title={item.firstName + ' ' + item.lastName}
            description={`${item.age} years old`}
          />
          <ActionMenu
            onEdit={() => onEdit(item.id)}
            onDelete={() => onDelete(item.id)}
          />
        </List.Item>
      )}
    />
  );
}

ContactList.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      age: PropTypes.number,
      photo: PropTypes.string,
    })
  ),
};

export default ContactList;
