import React from 'react';
import PropTypes from 'prop-types';
import { Layout as AntdLayout } from 'antd';

const { Content } = AntdLayout;

const Layout = ({ children }) => {
  return (
    <Content style={{ minHeight: '100vh' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>{children}</div>
    </Content>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
