<%--
  Created by IntelliJ IDEA.
  User: minky
  Date: 2023-05-14
  Time: 오후 3:50
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:set var="ctx" value="${pageContext.servletContext.contextPath}"/>
<html>
<head>
    <title>채팅방 목록</title>
    <script type="text/javascript">
        window.onload = () => {
            var roomName = '${chatRoomDTO.name}';
            console.log('roomName', roomName);
            console.log('roomName', roomName == '');
            if (!(roomName == undefined || roomName == null || roomName == ''))
                alert(roomName + "방이 개설되었습니다.");
            document.querySelector(".btn-create").on("click", function (e) {
                e.preventDefault();
                var name = document.querySelector("input[name='name']").val();
                if (name == "")
                    alert("Please write the name.")
                else
                    document.querySelector("form").submit();
            });
        };
    </script>
</head>
<body>

<div class="container">
    <div>
        <ul>
            <c:forEach var="room" items="${list}">
                <li><a href="${ctx}/chat/room?roomId=${room.roomId}">${room.name}</a></li>
            </c:forEach>
        </ul>
    </div>
</div>
<form action="${ctx}/chat/room" method="post">
    <input type="text" name="name" class="form-control">
    <button class="btn btn-secondary">개설하기</button>
</form>
</body>
</html>
