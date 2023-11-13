import React, { useEffect } from 'react';
import { createPage, rootStore, navigate, pageStore } from '@/zero';
import { toJS } from 'mobx';
import { Button } from 'antd-mobile';

export default createPage({ navBar: { title: '不同意' } }, () => {
  const user = toJS(rootStore.appStore.user);

  useEffect(() => {
    pageStore.setPageStatus('success');
  }, []);
  return (
    <>
      <div>{user?.name}</div>
      <Button onClick={() => navigate.goTo('/work/dotask')}>word</Button>
    </>
  );
});
