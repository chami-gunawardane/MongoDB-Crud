import './App.css';
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <Dashboard />
      <ToastContainer /> {/* This renders the toasts */}

    </div>
  );
}

export default App;
