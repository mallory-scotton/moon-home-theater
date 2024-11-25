import { StrictMode } from 'react';
import { render } from 'react-dom';

render(
  <StrictMode>
    <h1>Hello World</h1>
  </StrictMode>,
  document.getElementById('app')
);
