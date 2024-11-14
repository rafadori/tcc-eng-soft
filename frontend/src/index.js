import React from 'react'; // Importa a biblioteca React, que é necessária para criar componentes React.
import ReactDOM from 'react-dom/client'; // Importa a biblioteca ReactDOM, que é necessária para renderizar componentes React na DOM.
import App from './App'; // Importa o componente principal App do arquivo App.js.

const root = ReactDOM.createRoot(document.getElementById('root')); 
// Cria uma raiz React a partir do elemento DOM com o id 'root'. 
// O createRoot é utilizado para criar uma árvore de elementos React.

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
// Renderiza o componente App dentro do elemento DOM com id 'root'.
// O React.StrictMode é um ajudante para destacar problemas potenciais na aplicação React, como práticas antigas ou não recomendadas.
