import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { AuthProvider } from './contexts/Auth.jsx';
import Rutas from './rutas/Rutas.jsx';

function App() {
  return (
    <AuthProvider>
      <Rutas/>
    </AuthProvider>
  )
}

export default App;
