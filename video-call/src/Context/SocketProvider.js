// import React, { createContext, useContext, useMemo } from 'react'
// import { io } from 'socket.io-client';





// export const SocketProvider=(props)=>{
//     const socket =useMemo(()=>io('localhost:8000'),[]);
//     return(
//         <SocketContext.Provider value={socket}>
//             {props.childern}
//         </SocketContext.Provider>
//     )
// };