import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n';
import { QueryProvider } from './app/QueryProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <QueryProvider>
    <App />
  </QueryProvider>,
)
