import React, { useEffect, useState, useCallback } from 'react';
import {
  createPage,
  useEnv,
  useSystem,
  sessionStorage,
  pageStore,
  rootStore,
  useMergeState,
  HttpClient,
  navigate,
  useToken,
} from '@/zero';
import { Button, Collapse, Tabs, Input, Toast } from 'antd-mobile';
import { MD5 } from 'crypto-js';
import dayjs from 'dayjs';

const { Panel } = Collapse;

const system = useSystem();
const { removeToken, setToken } = useToken();

export default createPage({ navBar: { title: '工具' } }, () => {
  const { routes, appId, webpackConfig, apolloConf, setEnv, ...restEnv } =
    useEnv();
  const [requestLog, setRequestLog] = useState([]);

  const [state, setState] = useMergeState({
    baseURL: restEnv.REQUEST.BASE.baseURL,
    userId: rootStore.appStore.user.userId,
    response: {},
    needPassword: !['local', 'test'].includes(restEnv.ENV),
    pagePassword: '',
  });

  const { userId, response, needPassword, pagePassword } = state;
  const externalLogin = useCallback(
    (flag?: boolean) => {
      removeToken();
      HttpClient.post(`login?code=121212&uuid=23423423423`, {
        code: '121212',
        uuid: '23423423423',
        name: userId,
      })
        .then((res: any) => {
          setState({
            response: res,
          });
          sessionStorage.clearAll();
          setToken(res.token);
          if (flag) {
            navigate.reload('/index/index');
          }
        })
        .catch((e) => {
          setState({
            response: e,
          });
        });
    },
    [userId]
  );
  const openTools = useCallback(() => {
    const inputToken = MD5(pagePassword).toString();
    if (inputToken === '20e8abc73634844aa6eaf0d25ed8450b') {
      setState({ needPassword: false });
    } else {
      Toast.show({
        icon: 'fail',
        content: '校验失败',
      });
    }
  }, [pagePassword]);

  useEffect(() => {
    const apiLog = sessionStorage.get('request-log')?.reverse() || [];
    setRequestLog(apiLog);
  }, [pageStore.route]);

  useEffect(() => {
    pageStore.setPageStatus('success');
  }, []);

  if (needPassword) {
    return (
      <div>
        <Input
          style={{ marginTop: '10px' }}
          clearable
          type='password'
          onChange={(val) => {
            setState({
              pagePassword: val,
            });
          }}
        />
        <Button
          style={{ marginTop: '10px', marginRight: '10px' }}
          onClick={() => {
            openTools();
          }}
        >
          打开工具
        </Button>
      </div>
    );
  }

  return (
    <Tabs style={{ width: '100%', height: '100%', overflow: 'auto' }}>
      <Tabs.Tab title='操作' key='操作'>
        <Input
          style={{ marginTop: '10px' }}
          value={userId}
          onChange={(val) => {
            setState({
              userId: val,
            });
          }}
        />
        <Button
          style={{ marginTop: '10px', marginRight: '10px' }}
          onClick={() => {
            externalLogin();
          }}
        >
          登录
        </Button>
        <Button
          style={{ marginBottom: '10px' }}
          onClick={() => {
            externalLogin(true);
          }}
        >
          登录回首页
        </Button>
        <div style={{ overflow: 'auto', width: '70vw' }}>
          <pre>{JSON.stringify(response || {}, null, ' ')}</pre>
        </div>
      </Tabs.Tab>
      <Tabs.Tab title='信息' key='信息'>
        <Collapse>
          <Panel key='环境信息' title='环境信息'>
            <pre style={{ overflow: 'auto', width: '90vw' }}>
              {JSON.stringify(
                {
                  ...restEnv,
                  buildTime: dayjs(restEnv.buildTime).format(
                    'YYYY-MM-DD HH:mm:ss'
                  ),
                } || {},
                null,
                ' '
              )}
            </pre>
          </Panel>
          <Panel key='启动信息' title='启动信息'>
            <pre style={{ overflow: 'auto', width: '90vw' }}>
              {JSON.stringify(rootStore.appStore.launchInfo || {}, null, ' ')}
            </pre>
          </Panel>
          <Panel key='用户信息' title='用户信息'>
            <pre style={{ overflow: 'auto', width: '90vw' }}>
              {JSON.stringify(rootStore.appStore.user || {}, null, ' ')}
            </pre>
          </Panel>
          <Panel key='系统信息' title='系统信息'>
            <pre style={{ overflow: 'auto', width: '90vw' }}>
              {JSON.stringify(system || {}, null, ' ')}
            </pre>
          </Panel>
          <Panel key='微信信息' title='微信信息'>
            <pre style={{ overflow: 'auto', width: '90vw' }}>
              {JSON.stringify((window as any).wx || {}, null, ' ')}
            </pre>
          </Panel>
        </Collapse>
      </Tabs.Tab>
      <Tabs.Tab title='日志' key='日志'>
        <Button
          style={{ marginBottom: '30px' }}
          onClick={() => {
            setRequestLog([]);
            sessionStorage.set('request-log', []);
          }}
        >
          清理
        </Button>
        <Collapse>
          {requestLog.map((item: any, index: number) => {
            return (
              <Panel key={`${item.url}-${index}`} title={item.url}>
                <pre style={{ overflow: 'auto', width: '90vw' }}>
                  {JSON.stringify(item || {}, null, ' ')}
                </pre>
              </Panel>
            );
          })}
        </Collapse>
      </Tabs.Tab>
    </Tabs>
  );
});
