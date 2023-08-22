import axios from 'axios';
import { Toast } from 'antd-mobile';
import { useEnv, rootStore, useToken } from '@/zero';

const env = useEnv();
const { getToken } = useToken();

interface IDownload {
  url: string;
  method?: 'get' | 'post';
  fileName?: string;
  data?: Record<string, any> | undefined | null;
}

const axiosFile = ({ url, method = 'get', data }: IDownload) => {
  return axios({
    method: method || 'get',
    url,
    data: data || {},
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    responseType: 'arraybuffer',
  }).then((res: any) => {
    try {
      const enc = new TextDecoder('utf-8');
      const data = JSON.parse(enc.decode(new Uint8Array(res.data)));
      if (!data || (data.code && Number(data.code) != 0)) {
        return Promise.reject(data);
      }
    } catch (error) {
      return { data: res.data, headers: res.headers };
    }
  });
};

const download = async ({ url, fileName, method = 'get', data }: IDownload) => {
  try {
    const fileData = await axiosFile({ url, method, data });
    if (fileData && fileData.data && fileData.headers) {
      const url = window.URL.createObjectURL(new Blob([fileData.data]));
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      const disposition = fileData.headers['content-disposition'] || '';
      const dispositionArr = disposition.split('=') || [];
      const resFileName =
        dispositionArr.length == 2 ? decodeURIComponent(dispositionArr[1]) : '';

      a.setAttribute('download', fileName || resFileName);
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    }
  } catch (error: any) {
    Toast.show({
      icon: 'fail',
      content: (error && error?.msg) || '文件下载失败',
    });
  }
};

const downloadFile = (fileName: string) => {
  return download({
    url: `${env.REQUEST.BASE.baseURL}common/download?fileName=${encodeURI(
      fileName
    )}`,
    fileName,
  });
};

const requestFile = async (fileName: string) => {
  try {
    const res = await axiosFile({
      url: `${env.REQUEST.BASE.baseURL}common/download?fileName=${encodeURI(
        fileName
      )}`,
    });
    return res && res.data;
  } catch (error: any) {
    // 用户未登录情况，去登录完重新请求文件
    if (error && error.code && error.code == '401') {
      return rootStore.appStore.gotoLogin().then(() => {
        return axiosFile({
          url: `${env.REQUEST.BASE.baseURL}common/download?fileName=${encodeURI(
            fileName
          )}`,
        });
      });
    }
    return Promise.reject(error);
  }
};

export { download, downloadFile, axiosFile, requestFile };
