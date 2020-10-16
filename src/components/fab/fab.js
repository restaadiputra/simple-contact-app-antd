import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import styled from 'styled-components';
import { PlusOutlined } from '@ant-design/icons';

const FabContainer = styled.div`
  position: fixed;
  right: 30px;
  bottom: 30px;
  z-index: 10;
  width: 60px;
  height: 60px;
  cursor: pointer;
`;

const StyledButton = styled(Button)`
  width: 60px !important;
  height: 60px !important;
  span {
    font-size: 30px;
  }
`;

const Fab = ({ onClick }) => {
  return (
    <FabContainer>
      <StyledButton
        type="primary"
        icon={<PlusOutlined />}
        onClick={onClick}
        shape="circle"
        size='large'
      />
    </FabContainer>
  );
};

Fab.propTypes = {
  onClick: PropTypes.func,
};

export default Fab;
