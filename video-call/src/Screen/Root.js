import React, { useCallback, useEffect, useState } from 'react'
import { useSocket } from '../App'
import ReactPlayer from 'react-player'

const Root = () => {
    const [remoteSocketId,setRemoteSocketId]=useState(null)
    const [mystream,setMystream]=useState(null)
    const socket =useSocket()
    const handleUserJoin = useCallback(({email,id})=>{
        console.log(`Email ${email} has join`);
        setRemoteSocketId(id)
    })
    useEffect(()=>{
        socket.on("user:join",handleUserJoin);
        return()=>{
            socket.off("user:join",handleUserJoin)
        }
       
    },[socket,handleUserJoin]);


    const handleCall=useCallback(async()=>{
      const stream = await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
      })
      setMystream(stream);
    });
  return (
    <div>
      <h1>Room</h1>
      <h2>{remoteSocketId?'Connected':'Not Connected'}</h2>
     { 
     remoteSocketId && <button onClick={handleCall}>CALL</button>
   }
      {
        mystream && <ReactPlayer playing muted height='100px' width='200px'  url={mystream}/>
      }
    </div>
  )
}

export default Root