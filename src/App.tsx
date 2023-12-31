import { createContext, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Proxies from './Proxy';

const defaultTheme = "sap_horizon";
export const ThemeContext = createContext(defaultTheme);

const themes = [
  { key: "sap_horizon", name: "Morning Horizon (Light)" },
  { key: "sap_horizon_dark", name: "Evening Horizon (Dark)" },
  { key: "sap_horizon_hcb", name: "Horizon High Contrast Black" },
  { key: "sap_horizon_hcw", name: "Horizon High Contrast White" },
];

function App() {

  const [theme, setThemeState] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={theme}>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="/" element={<Navigate to='/proxies' />} />
          <Route path="/proxies" element={<Proxies mode='DIS' />} />
          <Route path="/proxies/create" element={<Proxies mode='CRE' />} />
        </Route>
        <Route path="/Login" element={<Login />} />
      </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
