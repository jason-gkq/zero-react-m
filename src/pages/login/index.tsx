import React, { useCallback, useEffect } from 'react';
import {
  PasscodeInput,
  NumberKeyboard,
  Form,
  Button,
  Input,
} from 'antd-mobile';
import {
  createPage,
  ICProps,
  navigate,
  pageStore,
  useToken,
  HttpClient,
  guid,
} from '@/zero';

const { setToken } = useToken();

export default createPage({ navBar: { title: '登录' } }, (props: ICProps) => {
  const {
    params: { redirect = '/index/index' },
  } = props;

  useEffect(() => {
    pageStore.setPageStatus('success');
  }, []);

  const onFinish = useCallback(async (values: any) => {
    console.log(values);
    const { token }: any = await HttpClient.post(`login`, {
      code: values.password,
      ...values,
      uuid: guid(),
    });
    setToken(token);
    navigate.reload(redirect);
  }, []);

  return (
    <Form
      // layout='horizontal'
      footer={
        <Button block type='submit' color='primary' size='large'>
          登录
        </Button>
      }
      onFinish={onFinish}
    >
      <Form.Item
        name='name'
        label='姓名'
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <Input onChange={console.log} placeholder='请输入姓名' />
      </Form.Item>
      <Form.Item
        name='password'
        label='密码'
        rules={[{ required: true, message: '姓名不能为空' }]}
      >
        <PasscodeInput length={4} plain keyboard={<NumberKeyboard />} />
      </Form.Item>
    </Form>
  );
});
