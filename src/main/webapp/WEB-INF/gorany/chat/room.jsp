<%--
  Created by IntelliJ IDEA.
  User: minky
  Date: 2023-05-11
  Time: 오후 10:57
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel='stylesheet' type='text/css' href='${pageContext.servletContext.contextPath}/css/chat-room.css'>
</head>
<body>
<div id='chatt'>
    <h1>WebSocket 채팅</h1>
    <div>
        <ul>
            <li><label>RoomName: </label><span id="roomName">${chatRoomDTO.name}</span></li>
            <li><label>RoomId: </label><span id="roomId">${chatRoomDTO.roomId}</span></li>
        </ul>
    </div>
    <select id="wsType">
        <option value="WSSTP">ws-Stomp</option>
        <option value="SJSTP">ws-SockJS Stomp</option>
    </select>
    <input type='text' id='serverEndPoint' value="${header.host}/ws/chat"/>
    <br/>
    <input type='text' id='userName' value='홍길동'>
    <input type='button' value='접속' id='btnConnect'>
    <br/>
    <div id='talk'></div>
    <div id='sendZone'>
        <textarea id='msg' value='hi...'></textarea>
        <input type='button' value='전송' id='btnSend'>
    </div>
</div>
<%--<script src='https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.min.js'></script>--%>
<script src='${pageContext.servletContext.contextPath}/js/stomp-client.js?ver=1'></script>
<%--<script src='${pageContext.servletContext.contextPath}/js/chat.js?ver=1'></script>--%>
<script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
<script type="text/javascript">
    function getId(id) {
        return document.getElementById(id);
    }

    /**
     * Elements
     */
    var userName = getId('userName');     //사용자명 입력필드
    var btnConnect = getId('btnConnect'); //접속 버튼
    var talk = getId('talk');         //대화내용 출력영역
    var msg = getId('msg');           //메시지 입력 필드
    var btnSend = getId('btnSend');   //전송 버튼

    /**
     * WebSocket Client
     * @type {StompClient}
     */
    var fncOnMessage = (message) => {
        console.log('fncOnMessage', '----------------------------------------');
        console.log('message', message);
        var data = JSON.parse(message.data);

        let id = document.createElement('span');
        id.style = 'font-weight: bold;';
        id.innerText = data.userName;
        let msg = document.createElement('span');
        msg.innerText = data.msg;
        let div = document.createElement('div');
        div.className = data.userName == userName.value ? 'me' : 'other';
        div.innerHTML = id.outerHTML;
        div.innerHTML += '[ ' + data.date + ' ]';
        div.innerHTML += '<br/>';
        div.innerHTML += msg.outerHTML;

        talk.innerHTML += div.outerHTML;
        talk.scrollTop = talk.scrollHeight;//스크롤바 하단으로 이동

    };
    var fncConnectCallback = () => {
        console.log('fncConnectCallback', '----------------------------------------');
        ws.send('/pub/chat/enter', {}, JSON.stringify({
            roomId: getId('roomId').value,
            writer: getId('userName').value
        }));
    }
    var ws = new StompClient({
        enableLog: true,
        // wsType: StompClient.wsType.WSSTP,
        wsType: StompClient.wsType.SJSTP,
        serverEndPoint: document.querySelector('#serverEndPoint').value,
        onMessage: fncOnMessage,
        conn: {
            headers: {'header1': 'test1', 'header2': 'test2'},
            callback: fncConnectCallback,
            sub: {
                // dest: "/sub/chat/room/" + getId('roomId').value,
                dest: "/sub/chat/room/${chatRoomDTO.roomId}",
                callback: fncOnMessage
            }
        }
    });
    let fncSend = () => {
        if (msg.value.trim() != '') {
            let payload = {};//전송 데이터(JSON)
            payload.userName = getId('userName').value;
            payload.msg = msg.value;
            payload.date = new Date().toLocaleString();

            payload.roomId = getId('roomId').value;
            payload.writer = getId('userName').value;
            payload.message = msg.value;

            ws.send('/pub/chat/message', {}, JSON.stringify(payload));
        }
        msg.value = '';
    }

    /**
     * Set EventListener
     */
    btnConnect.onclick = () => {
        const selctedOptVal = document.querySelector('#wsType').options[document.querySelector('#wsType').selectedIndex].value;
        ws.setWsType(StompClient.wsType.valueOf(selctedOptVal));
        ws.setServerEndPoint(document.querySelector('#serverEndPoint').value);
        ws.open(wsType);
    }
    msg.onkeyup = (ev) => {
        if (ev.keyCode == 13)
            fncSend();
    }
    btnSend.onclick = () => {
        fncSend();
    }
</script>
</body>
</html>
