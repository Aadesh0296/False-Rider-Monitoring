import "./App.css";
import Dashboard from "./pages/Dashboard";
import { userImg, GuardianRide } from "./assets";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-left">
          <span>About</span>
          <span>Headquarters</span>
        </div>
        <img src={GuardianRide} alt="" style={{width:"15%", padding:"22px"}}/>
        <div className="header-left">
          <input type="text" placeholder="search by city"/>
          <img src={userImg} alt="" />
        </div>
      </header>
      <Dashboard />
    </div>
  );
}

export default App;
