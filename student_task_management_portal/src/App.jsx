import "./App.css"
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Welcome from "./components/welcome";

function App(){
  return(
    <div>
      <Navbar />
      <Welcome />
      <Dashboard />
    </div>
  );
}

export default App;