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
    <h1>WebSocket 채팅 by Basic</h1>
    <select id="wsType">
        <option value="WS">ws</option>
        <option value="SJ">ws-SockJS</option>
        <option value="STP">ws-Stomp</option>
    </select>
    <input type='text' id='serverEndPoint' value="${header.host}/ws/chat"/>
    <br/>
    <input type='text' id='mid' value='홍길동'>
    <input type='button' value='로그인' id='btnLogin'>
    <br/>
    <div id='talk'></div>
    <div id='sendZone'>
        <textarea id='msg' value='hi...'></textarea>
        <input type='button' value='전송' id='btnSend'>
    </div>
</div>
<script src='https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.min.js'></script>
<script src='${pageContext.servletContext.contextPath}/js/ws-client.js?ver=1'></script>
<script src='${pageContext.servletContext.contextPath}/js/chat.js?ver=1'></script>
<script src='${pageContext.servletContext.contextPath}/js/webstomp-client/1.2.3/webstomp.js?ver=1.2.3'></script>
<script>

</script>
</body>
</html>
