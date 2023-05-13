/**
 * web socket
 */

function getId(id) {
    return document.getElementById(id);
}

var data = {};//전송 데이터(JSON)

var ws;
var mid = getId('mid');           //ID 입력필드
var btnLogin = getId('btnLogin'); //로그인 버튼
var talk = getId('talk');         //대화내용 출력영역
var msg = getId('msg');           //메시지 입력 필드
var btnSend = getId('btnSend');   //전송 버튼

btnLogin.onclick = function () {
    ws = new WebSocket("ws://" + location.host + "/chatt?queryString=WebSocket Query String Test Value");

    ws.onmessage = function (msg) {
        var data = JSON.parse(msg.data);
        var css;

        if (data.mid == mid.value) {
            css = 'class=me';
        } else {
            css = 'class=other';
        }

        var item = `<div ${css} >
		                <span><b>${data.mid}</b></span> [ ${data.date} ]<br/>
                      <span>${data.msg}</span>
						</div>`;

        talk.innerHTML += item;
        talk.scrollTop = talk.scrollHeight;//스크롤바 하단으로 이동
    }
}

msg.onkeyup = function (ev) {
    if (ev.keyCode == 13) {
        send();
    }
}

btnSend.onclick = function () {
    send();
}

function send() {
    if (msg.value.trim() != '') {
        data.mid = getId('mid').value;
        data.msg = msg.value;
        data.date = new Date().toLocaleString();
        var temp = JSON.stringify(data);
        ws.send(temp);
    }
    msg.value = '';

}