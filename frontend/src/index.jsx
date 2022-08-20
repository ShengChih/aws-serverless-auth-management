import { StrictMode } from "react";
import * as ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n'

import '@/index.css';
import App from '@/App';
import reportWebVitals from '@/reportWebVitals';

const rootElement = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
