import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Dropdown, Button } from 'antd';
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const menu = (onEdit, onDelete) => (
  <Menu>
    <Menu.Item
      key="0"
      icon={<EditOutlined />}
      onClick={onEdit}
      data-testid="edit"
      style={{ padding: '0.5rem 1rem' }}
      
      >
      Edit
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
      key="1"
      icon={<DeleteOutlined />}
      onClick={onDelete}
      data-testid="delete"
      style={{ padding: '0.5rem 1rem' }}
    >
      Delete
    </Menu.Item>
  </Menu>
);

function ActionMenu({ onEdit, onDelete }) {
  return (
    <Dropdown overlay={menu(onEdit, onDelete)} trigger={['click']}>
      <Button
        type="text"
        icon={<SettingOutlined />}
        size="large"
        shape="circle"
        data-testid="menu"
      />
    </Dropdown>
  );
}

ActionMenu.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default ActionMenu;
