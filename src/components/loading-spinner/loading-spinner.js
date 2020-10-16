import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const StyledSpinnerContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - 128px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > .ant-typography {
    margin-top: 10px;
  }
`;

function LoadingSpinner({ wording }) {
  return (
    <StyledSpinnerContainer>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
      <Typography.Paragraph>
        {wording || 'Please Wait...'}
      </Typography.Paragraph>
    </StyledSpinnerContainer>
  );
}

LoadingSpinner.propTypes = {
  wording: PropTypes.string,
};

export default LoadingSpinner;
