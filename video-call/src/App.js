
import { Route, Routes } from 'react-router-dom';
import LobbyScreen from './Screen/LobbyScreen';
import { createContext, useContext, useMemo } from 'react';
import { io } from 'socket.io-client';
import Root from './Screen/Root';


const SocketContext = createContext(null);

export const useSocket=()=>{
  const socket = useContext(SocketContext);
  return socket;
};

function App() {
  const socket =useMemo(()=>io('localhost:8000'),[]);
  return (
    <div>
      <SocketContext.Provider value={socket} >
        <Routes>
          <Route path="/" element={<LobbyScreen/>}/>
          <Route path="/room/:id" element={<Root/>}/>
        </Routes>
      </SocketContext.Provider>
 
    </div>
  );
}

export default App;
