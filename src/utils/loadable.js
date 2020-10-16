import React from 'react';
import LoadableComponent from '@loadable/component';
import LoadingSpinner from 'components/loading-spinner';

export default (callback) => {
  return LoadableComponent(callback, {
    ssr: false,
    fallback: <LoadingSpinner />,
  });
};
