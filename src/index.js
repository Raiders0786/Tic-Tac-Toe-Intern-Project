import React from 'react';
import ReactDOM from 'react-dom';
import { enableMapSet } from 'immer';
import 'semantic-ui-css/semantic.min.css';
import { createGlobalStyle } from 'styled-components';

import App from './components/App';

const GlobalStyles = createGlobalStyle`
   * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
   }

   body {
      width: 100vw;
      height: 100vh;
   }

   #root {
      width: 100%;
      height: 100%;
      padding: 1rem;
   }
`;

enableMapSet();
ReactDOM.render(
	<React.Fragment>
		<GlobalStyles />
		<App />
	</React.Fragment>,
	document.getElementById('root')
);
