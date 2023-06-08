import React, { useCallback, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useSocket } from '../App';
import { useNavigate } from 'react-router-dom';


const LobbyScreen = () => {
    const navigate = useNavigate();
    const[room,setRoom]=useState('');
    const[email,setEmail]=useState('');

    const socket = useSocket();


    const handleSubmitForm=useCallback((e)=>{
        e.preventDefault();
        socket.emit('room:join',{email,room})

    },[email,room,socket]);

    const handleJoinRoom=useCallback((data)=>{
        const {email,room}=data
        navigate(`/room/${room}`)
    },[])

    useEffect(()=>{
        socket.on('room:join',handleJoinRoom);
        return()=>{
            socket.off('room:join',handleJoinRoom);
        }
    },[socket]);

  return (
    <Form className='col-5 m-auto mt-5' onSubmit={handleSubmitForm}>
      <Row className="mb-3 ">
        <Form.Group  controlId="formGridEmail " className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)}/>
        </Form.Group>

        <Form.Group  controlId="formGridPassword " className='mb-3'>
          <Form.Label>Room Number</Form.Label>
          <Form.Control type="text" value={room}  placeholder="Room Number" onChange={(e)=>setRoom(e.target.value)}/>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit">
        join
      </Button>
    </Form>
  )
}

export default LobbyScreen