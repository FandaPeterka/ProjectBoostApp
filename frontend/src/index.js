import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Zde ujistěte se, že váš vlastní CSS není v konfliktu s Tailwindem
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { ProjectsContextProvider } from './context/ProjectsContext';
import 'tailwindcss/tailwind.css'; // Přidejte tento import pro Tailwind CSS

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProjectsContextProvider> {/* Wrap App inside ProjectsContextProvider */}
        <App />
      </ProjectsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);