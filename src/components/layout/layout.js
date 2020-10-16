import React from 'react';
import PropTypes from 'prop-types';
import { Layout as AntdLayout } from 'antd';
import styled from 'styled-components';

const { Content } = AntdLayout;

const StyledContent = styled(Content)`
  min-height: 100vh;
  max-width: 1200px;
  padding: 1rem;
  margin: 0 auto;
`;

const Layout = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
