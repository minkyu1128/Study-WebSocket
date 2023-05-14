function getId(id) {
    return document.getElementById(id);
}

/**
 * Elements
 */
let mid = getId('mid');           //ID 입력필드
let btnLogin = getId('btnLogin'); //로그인 버튼
let talk = getId('talk');         //대화내용 출력영역
let msg = getId('msg');           //메시지 입력 필드
let btnSend = getId('btnSend');   //전송 버튼

/**
 * WebSocket Client
 * @type {WsClient}
 */
let fncOnMessage = (message) => {
    var data = JSON.parse(message.data);

    // var css;
    // if (data.mid == mid.value)
    //     css = 'class=me';
    // else
    //     css = 'class=other';
    // var item = `
    //             <div ${css} >
    //                 <span>
    //                     <b>${data.mid}</b>
    //                 </span> [ ${data.date} ]
    //                 <br/>
    //                 <span>${data.msg}</span>
    //             </div>`;
    // talk.innerHTML += item;
    // talk.scrollTop = talk.scrollHeight;//스크롤바 하단으로 이동

    let id = document.createElement('span');
    id.style = 'font-weight: bold;';
    id.innerText = data.mid;
    let msg = document.createElement('span');
    msg.innerText = data.msg;
    let div = document.createElement('div');
    div.className = data.mid == mid.value ? 'me' : 'other';
    div.innerHTML = id.outerHTML;
    div.innerHTML += '[ ' + data.date + ' ]';
    div.innerHTML += '<br/>';
    div.innerHTML += msg.outerHTML;

    talk.innerHTML += div.outerHTML;
    talk.scrollTop = talk.scrollHeight;//스크롤바 하단으로 이동

};
let ws = new WsClient({
    enableLog: true,
    wsType: WsClient.wsType.WS,
    serverEndPoint: document.querySelector('#serverEndPoint').value,
    onMessage: fncOnMessage
});
let fncSend = () => {
    if (msg.value.trim() != '') {
        let payload = {};//전송 데이터(JSON)
        payload.mid = getId('mid').value;
        payload.msg = msg.value;
        payload.date = new Date().toLocaleString();
        ws.send(JSON.stringify(payload));
    }
    msg.value = '';
}

/**
 * Set EventListener
 */
btnLogin.onclick = () => {
    const selctedOptVal = document.querySelector('#wsType').options[document.querySelector('#wsType').selectedIndex].value;
    ws.setWsType(WsClient.wsType.valueOf(selctedOptVal));
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