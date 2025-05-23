import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', height: '100vh', flexDirection: 'column'}}>
      <Spin size="large" tip="Loading..." />
    </div>
  );
};

export default Loading;