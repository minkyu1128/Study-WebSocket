/**
 * WebSocket Client Util
 *  -. WebSocket과 SockJS 방식을 지원 한다.
 *  -. SockJS 사용 시 sockjs-client 라이브러리가 필요 하다
 *      ex)
 *        <script src='https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.min.js'></script>
 * @Author mk.park
 * @Date 2023.05.13.
 */
class WsClient {
    constructor(props) {
        this.enableLog = WsClient.isBlank(props.enableLog) ? false : props.enableLog;
        this.wsType = props.wsType;
        this.serverEndPoint = props.serverEndPoint;
        if (!WsClient.isBlank(props.onOpen)) this.onOpen = props.onOpen;
        if (!WsClient.isBlank(props.onMessage)) this.onMessage = props.onMessage;
        if (!WsClient.isBlank(props.onClose)) this.onClose = props.onClose;
        if (!WsClient.isBlank(props.onError)) this.onError = props.onError;
    }

    static isBlank(value) {
        if (value == undefined || value == null || value == '' || value == ' ')
            return true;
        return false;
    }

    setWsType(wsType) {
        this.wsType = wsType;
    }

    setServerEndPoint(serverEndPoint) {
        this.serverEndPoint = serverEndPoint;
    }

    //WebSocket Connection
    open() {
        if (this.wsType === 'ws')
            this.ws = new WebSocket("ws://" + this.serverEndPoint + "?type=WS");
        else if (this.wsType === 'wss')
            this.ws = new WebSocket("wss://" + this.serverEndPoint + "?type=WSS");
        else if (this.wsType === 'sj')
            this.ws = new SockJS(this.serverEndPoint + "?type=SJ", null, {transports: ["websocket", "xhr-streaming", "xhr-polling"]});
        else {
            alert("WebSocket This call type is required!!");
            return false;
        }
        this.ws.onopen = this.onOpen;
        this.ws.onmessage = this.onMessage;
        this.ws.onclose = this.onClose;
        this.ws.onerror = this.onError;
    }

    //WebSocket Disconnection
    close() {
        this.ws.close();
    }

    //Message Send
    send(payload) {
        if (WsClient.isBlank(this.ws)) {
            alert("WebSocket is not connected!!");
            return false;
        }
        if (this.enableLog) console.log('send payload', payload);
        this.payload = payload;
        this.ws.send(this.payload);
    }

    //get Last Send Data
    getPayload() {
        return this.payload;
    }

    //Open EventListener
    onOpen(msg, ev) {
        if (this.enableLog) console.log('Unimplemented "onOpen" Function');
        if (this.enableLog) console.log('onOpen', msg, ev);
    }

    //Receive EventListener
    onMessage(msg, ev) {
        if (this.enableLog) console.log('Unimplemented "onMessage" Function');
        if (this.enableLog) console.log('onMessage', msg, ev);
    }

    //Close EventListener
    onClose(msg, ev) {
        if (this.enableLog) console.log('Unimplemented "onClose" Function');
        if (this.enableLog) console.log('onClose', msg, ev);
    }

    //Error EventListener
    onError(msg, ev) {
        if (this.enableLog) console.log('Unimplemented "onError" Function');
        if (this.enableLog) console.log('onError', msg, ev);
    }

}