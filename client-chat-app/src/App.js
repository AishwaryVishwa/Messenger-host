import logo from './logo.svg';
import { Route, Routes } from "react-router-dom"
import './App.css';
import Home from './Pages/Home';
import ChatPage from './Pages/ChatPage';

function App() {
  return (
    <>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatPage" element={<ChatPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
