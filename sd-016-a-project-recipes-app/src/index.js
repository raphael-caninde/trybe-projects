import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import RecipeProvider from './context/RecipeProvider';

ReactDOM.render(
  <RecipeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecipeProvider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
