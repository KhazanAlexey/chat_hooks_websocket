import React, {useEffect, useRef, useState} from "react";

let chatStyle = {
    padding: '10px', border: '1px solid black', heigth: '600px',
    overflowY: 'scroll', width: '500px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    height: '400px'
}

export const Chat = (props) => {
    const scroll = React.createRef()

    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState({})
    useEffect(() => {
        let socket = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx")
        setSocket(socket)

    }, [])
    useEffect(() => {

        if (socket) {
            socket.onmessage = onMessage

        }
    })
    useEffect(() => {
        if (scroll) {
            let div = scroll.current
            div.scrollTo(0, div.scrollHeight)
        }

    })


    const onMessage = (messageEvent) => {
        if (messageEvent.data) {
            let Newmessages = JSON.parse(messageEvent.data)

            setMessages([...messages, ...Newmessages])
        }
    }
    const onKeyPress = (e) => {
        if (e.ctrlKey && e.charCode === 13) {
            socket.send(e.target.value)

            e.target.value = ''
        }
    }
    return <div>
        <h3>CHAT</h3>
        <div style={chatStyle} ref={scroll}>
            {messages.map(m => <div key={m.userId} style={{
                padding: '10px', border: '1px solid black'
            }}>
                <div style={{float: 'left', width: '100px', height: '100px', border: '1px solid black'}}><img
                    src={m.photo}/></div>
                <div style={{float: 'left', color: 'red', marginLeft: '10px'}}>{m.userName}</div>
                <div style={{float: 'right'}}>{m.message}</div>
            </div>)}

        </div>
        <div style={{padding: '10px'}}>
            <textarea placeholder={'введите текст сообщения'} onKeyPress={onKeyPress}></textarea>

        </div>

    </div>

}