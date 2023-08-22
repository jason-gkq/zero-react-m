import 'core-js';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import reportWebVitals from './reportWebVitals';

const { appName = 'root' } = process.env.productConfig as any;

let root: any;
function render(props: any) {
  const { container } = props;
  root = createRoot(
    container
      ? (container.querySelector(`#${appName}`) as Element)
      : (document.querySelector(`#${appName}`) as Element)
  );

  root.render(<App />);

  if ((module as any).hot) (module as any).hot.accept();
  reportWebVitals((data) => {
    sessionStorage.setItem(data.name, JSON.stringify(data));
    if (!['prod', 'fz'].includes((process as any).env.ENV)) {
      console.log(data);
    }
  });
}

render({});
