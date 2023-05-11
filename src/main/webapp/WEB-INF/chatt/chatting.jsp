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
    <link rel='stylesheet' type='text/css' href='./css/chatt.css'>
</head>
<body>
<div id='chatt'>
    <h1>WebSocket Chatting</h1>
    <input type='text' id='mid' value='홍길동'>
    <input type='button' value='로그인' id='btnLogin'>
    <br/>
    <div id='talk'></div>
    <div id='sendZone'>
        <textarea id='msg' value='hi...'></textarea>
        <input type='button' value='전송' id='btnSend'>
    </div>
</div>
<script src='./js/chatt.js'></script>
</body>
</html>
