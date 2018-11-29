import React from 'react';

export default function withLoading(WrappedComponent) {
  return function WithLoading(props) {
    const { loading, ...rest } = props;
    if (loading) {
      return 'loading...';
    } else {
      return <WrappedComponent {...rest} />;
    }
  };
}
