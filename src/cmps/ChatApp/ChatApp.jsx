
import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import TextField from '@material-ui/core/TextField'
import './ChatApp.scss'
import socketService from '../../services/socket-service'
import { loadRecipes } from '../../store/actions/recipeActions'
// const socket = io.connect('http://localhost:3030')
socketService.setup()

export function ChatApp({ recipeId }) {
    const [msgChat, setMsg] = useState({ message: '', name: '' })
    const [topic, setTopic] = useState('MyTopic')
    const [errMsg, setErrMsg] = useState('')
    const [chat, setChat] = useState([])
    
    useEffect(() => {
        socketService.emit("chat topic", recipeId);
    },[])
    useEffect(() => {
        socketService.on('chat newMsg', ({ name, message }) => {
            setChat([{ name, message }, ...chat ])
            console.log('chat', chat);    
        })
    })
    
    const onTextChange = e => {
        setMsg({ ...msgChat, [e.target.name]: e.target.value })
    }
    const onMessageSubmit = e => {
        e.preventDefault()
        var { name, message } = msgChat
        console.log({ name, message });
        if (name === '') name = 'Guest'
        if (message === '') {
            setErrMsg('Invalid massage')
            setTimeout(() => {
                setErrMsg('')
            }, 3000)
            return
        }
        socketService.emit('chat newMsg', { name, message })
        setMsg({ message: '', name })
    }
    const renderChat = () => {
        return chat.map(({ name, message }, index) => (
            <div className="msg" key={index}>
                <h4>
                    {name}: <span>{message}</span>
                </h4>
            </div>
        ))
    }
    
    return (
        <div className="chat-app mb15">
            <h2 className="title-chat text-center">Live Chat:</h2>
            <div className="content flex column align-center">
                <div className="main-chat">
                    {chat.length === 0 && <p className="text-center">Here you can share and just talk.</p>}
                    {chat.length > 0 && renderChat()}
                </div>
                <form className="flex column auto-center" onSubmit={onMessageSubmit}>
                    <div className="name-field mb15">
                        <TextField
                            name="name"
                            onChange={e => onTextChange(e)}
                            value={msgChat.name}
                            label="Name"
                        />
                    </div>
                    <div>
                        <TextField className="input-msg mb15"
                            name="message"
                            onChange={e => onTextChange(e)}
                            value={msgChat.message}
                            id="outlined-multiline-static"
                            variant="outlined"
                            label="Message"
                        />
                    </div>
                    <button className="btn">Send Message</button>
                    <p>{errMsg}</p>
                </form>
            </div>
        </div>
    )

}

