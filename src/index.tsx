import ReactDOM from 'react-dom';
import App from './App';
import {AuthProvider} from "./context/AuthContext.tsx";

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);