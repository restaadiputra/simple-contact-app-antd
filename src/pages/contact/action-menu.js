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
    >
      Edit
    </Menu.Item>
    <Menu.Item
      key="1"
      icon={<DeleteOutlined />}
      onClick={onDelete}
      data-testid="delete"
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
