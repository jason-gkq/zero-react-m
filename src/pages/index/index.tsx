import React, { useEffect } from 'react';
import { createPage, ICProps, navigate, pageStore } from '@/zero';
import { Button } from 'antd-mobile';

export default createPage({ navBar: true }, (props: ICProps) => {
  console.log(props);
  useEffect(() => {
    pageStore.setPageStatus('success');
  }, []);
  return (
    <>
      <Button onClick={() => navigate.goTo('/personal/center')}>
        去个人中心
      </Button>
    </>
  );
});
