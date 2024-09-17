import { StrictMode } from 'react'
import ReactDOM from 'react-dom';
import './index.css'
import App from './App.jsx'
import { store } from './app/store';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
