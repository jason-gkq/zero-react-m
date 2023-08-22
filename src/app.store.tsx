import React from 'react';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  HttpClient,
  useEnv,
  navigate,
  sessionStorage,
  isInBrowser,
  isInWechatWork,
  appendParam,
  useToken,
} from '@/zero';
import initHttpClient from './initHttpClient';
import {
  MessageOutline,
  MessageFill,
  UnorderedListOutline,
} from 'antd-mobile-icons';

const env = useEnv();
const { getToken } = useToken();

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
  launchInfo = {};
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
    const platform = isInBrowser() ? 'browser' : isInWechatWork() ? 'qw' : 'wx';
    env.setEnv({ platform });
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
    const { params, route } = options;
    yield runInAction(() => {
      this.launchInfo = options;
    });

    if (!getToken()) {
      yield runInAction(() => {
        this.appStatus = 'success';
      });
      navigate.goTo(`/login?redirect=${appendParam(route, params)}`);
      return;
    }
    /**
     * 获取用户信息
     */
    let userAuth = sessionStorage.get('userInfo');
    try {
      if (!userAuth) {
        const result: Promise<any> = yield HttpClient.get('getUserInfo');
        userAuth = result;
        sessionStorage.set('userInfo', result);
      }
    } catch (error) {
      userAuth = {};
    }
    const { user } = yield userAuth;
    runInAction(() => {
      this.appStatus = 'success';
      this.user = user;
    });
    console.log('11111------------', this.appStatus);
    console.log('app onLunch end');
  }
  onHide() {}
}

const appStore = new AppStore();

export default appStore;
