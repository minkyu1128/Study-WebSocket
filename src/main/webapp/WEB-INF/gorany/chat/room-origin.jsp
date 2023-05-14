<%--
  Created by IntelliJ IDEA.
  User: minky
  Date: 2023-05-14
  Time: 오후 5:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>채팅방</title>
    <script type="text/javascript">
        window.onload = function () {

            var roomName = '${chatRoomDTO.name}';
            var roomId = '${chatRoomDTO.roomId}';
            <%--var username = [[${authentication.principal.username}]];--%>
            var username = '익명사용자' + Math.random().toString().substring(2, 8);

            console.log(roomName + ", " + roomId + ", " + username);

            var sockJs = new SockJS("/stomp/chat");
            //1. SockJS를 내부에 들고있는 stomp를 내어줌
            var stomp = Stomp.over(sockJs);

            //2. connection이 맺어지면 실행
            stomp.connect({}, function () {
                console.log("STOMP Connection")

                //4. subscribe(path, callback)으로 메세지를 받을 수 있음
                stomp.subscribe("/sub/chat/room/" + roomId, function (chat) {
                    var content = JSON.parse(chat.body);

                    console.log('content', content);
                    var writer = content.writer;
                    var message = content.message;
                    var str = '';

                    console.log('writer === username', writer === username);
                    if (writer === username) {
                        str = "<div class='col-6'>";
                        str += "<div class='alert alert-secondary'>";
                        str += "<b>" + writer + " : " + message + "</b>";
                        str += "</div></div>";
                        // document.querySelector("#msgArea").append(str);
                        document.querySelector("#msgArea").insertAdjacentHTML('beforeend', str);
                    } else {
                        str = "<div class='col-6'>";
                        str += "<div class='alert alert-warning'>";
                        str += "<b>" + writer + " : " + message + "</b>";
                        str += "</div></div>";
                        document.querySelector("#msgArea").insertAdjacentHTML('beforeend', str);
                    }
                    // console.log(str);
                    // document.querySelector("#msgArea").insertAdjacentHTML('beforeend', str);
                });

                //3. send(path, header, message)로 메세지를 보낼 수 있음
                stomp.send('/pub/chat/enter', {}, JSON.stringify({roomId: roomId, writer: username}))
            });

            document.querySelector("#button-send").addEventListener("click", function (e) {
                var msg = document.getElementById("msg");

                console.log(username + ":" + msg.value);
                stomp.send('/pub/chat/message', {}, JSON.stringify({
                    roomId: roomId,
                    message: msg.value,
                    writer: username
                }));
                msg.value = '';
            });
        };
    </script>
</head>
<body>
<%--<th:block th:replace="~{/layout/basic :: setContent(~{this :: content})}">--%>
<%--  <th:block th:fragment="content">--%>

<div class="container">
    <div class="col-6">
        <h1>${chatRoomDTO.name}</h1>
    </div>
    <div>
        <div id="msgArea" class="col"></div>
        <div class="col-6">
            <div class="input-group mb-3">
                <input type="text" id="msg" class="form-control">
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" id="button-send">전송</button>
                </div>
            </div>
        </div>
    </div>
    <div class="col-6"></div>
</div>


<script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>

<%--  </th:block>--%>
<%--</th:block>--%>
</body>
</html>
