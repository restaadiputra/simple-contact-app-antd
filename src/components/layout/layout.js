import React from 'react';
import PropTypes from 'prop-types';
import { Layout as AntdLayout } from 'antd';
import styled from 'styled-components';

const { Content } = AntdLayout;

const StyledContent = styled(Content)`
  min-height: 100vh;
  padding: 1rem;
`;

const Layout = ({ children }) => {
  return <StyledContent>{children}</StyledContent>;
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
