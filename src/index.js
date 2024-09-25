import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import React, { useContext } from 'react';
import Home from './Pages/Home';
import History from './Pages/history';
import { ThemeContext } from '@emotion/react';
import { createBrowserRouter, RouterProvider, } from 'react-router-dom';
import { ThemeProviderComponent } from './ThemeProvider/ThemeContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
const useTheme = () => useContext(ThemeContext);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/",
        element: <Home />
      }
    ],
  }

]
)

root.render(
  <React.StrictMode>
    <ThemeProviderComponent>
      <RouterProvider router={router} />
    </ThemeProviderComponent>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
