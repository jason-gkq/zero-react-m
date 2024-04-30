import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  HttpClient,
  useEnv,
  sessionStorage,
  isInBrowser,
  isInWechatWork,
} from '@/zero';
import initHttpClient from './initHttpClient';
import {
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
} from 'antd-mobile-icons';

const env = useEnv();
const platform = isInBrowser() ? 'browser' : isInWechatWork() ? 'qw' : 'wx';
env.setEnv({ platform });
if (process.env.NODE_ENV !== 'development') {
  try {
    const { defineConfig } = await import(
      `../env/env.${process.env.BUILD_ENV}.js`
    );
    env.setEnv(defineConfig());
  } catch (error) {}
}

type IOptions = {
  route: string;
  params?: any;
  [key: string]: any;
};
type IErrorInfo = {
  description?: React.ReactNode;
  title?: React.ReactNode;
  image?: string | React.ReactElement;
  status?: 'default' | 'disconnected' | 'empty' | 'busy';
  renderChildren?: () => React.ReactNode;
};
export class AppStore {
  appStatus: 'loading' | 'error' | 'success' = 'loading';
  errorInfo: IErrorInfo | undefined | null;
  user = {};
  routes: any = [];
  tabs: any = [
    {
      key: '/index/index',
      title: '首页',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/personal/center',
      title: '个人中心',
      icon: (active: boolean) =>
        active ? <MessageFill /> : <MessageOutline />,
    },
  ];
  constructor() {
    /**
     * 设置http拦截器
     */
    initHttpClient(env.REQUEST);
    makeAutoObservable(this, {}, { autoBind: true });
  }

  pageBeforeOnLoad() {
    return true;
  }
  /* 静默授权获取凭证code */
  *onLaunch(options: IOptions) {
    console.log('app onLunch start', options);
    // const { params, route } = options;
    // 可做登录拦截
    // if (!getToken()) {
    //   yield runInAction(() => {
    //     this.appStatus = 'success';
    //   });
    //   navigate.goTo(`/login?redirect=${appendParam(route, params)}`);
    //   return;
    // }
    try {
      /**
       * 获取用户信息
       */
      let userAuth = sessionStorage.get('userInfo');
      if (!userAuth) {
        const result: Promise<any> = yield HttpClient.get('getUserInfo');
        userAuth = result;
        sessionStorage.set('userInfo', result);
      }
      const { user } = yield userAuth;
      runInAction(() => {
        this.appStatus = 'success';
        this.user = user;
      });
    } catch (error) {}
    console.log('app onLunch end');
  }
  onHide() {}
}

const appStore = new AppStore();

export default appStore;
