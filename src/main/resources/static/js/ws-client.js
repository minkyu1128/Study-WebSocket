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

    /* ==============================================================================
     * STATIC METHODS
     ============================================================================== */
    static isBlank(value) {
        if (value == undefined || value == null || value == '' || value == ' ')
            return true;
        return false;
    }

    static wsType = {
        WS: 'WebSocket',
        WSS: 'WebSocket SSH',
        SJ: 'WebSocket SockJS',

        valueOf(value) {
            if (WsClient.isBlank(WsClient.wsType[value])) {
                alert('no matching value');
                return false;
            }
            return WsClient.wsType[value];
        }
    }


    /* ==============================================================================
     * INSTANCE METHODS
     ============================================================================== */
    setWsType(wsType) {
        this.wsType = wsType;
    }

    setServerEndPoint(serverEndPoint) {
        this.serverEndPoint = serverEndPoint;
    }

    /**
     * Connection WebSocket
     */
    open() {
        if (this.wsType === WsClient.wsType.WS)
            this.ws = new WebSocket("ws://" + this.serverEndPoint + "?type=WS");
        else if (this.wsType === WsClient.wsType.WSS)
            this.ws = new WebSocket("wss://" + this.serverEndPoint + "?type=WSS");
        else if (this.wsType === WsClient.wsType.SJ)
            this.ws = new SockJS(this.serverEndPoint + "?type=SJ", null, {transports: ["websocket", "xhr-streaming", "xhr-polling"]});
        else {
            throw "WebSocket This call type is required!!";
        }

        /* ------------------------------------
         * WebSocket Header에 인증토큰 보내기 위한 방법
         *  1. this.ws.headers
         *   -> AI 답변에 따라 해보았으나 되지 않음. stackoverflow 사이트에서도 client가 header에 추가할 방법은 없다고 나옴
         *  2. cookie 사용
         *   -> cookie에 토큰 담아 서버에 전달 가능
         * TODO SockJS 사용 시에는 해보지 않음. 검증필요
        ------------------------------------ */
        //헤더방식 fail
        this.ws.headers = {
            "X-Test-Header": "hahahaha",
            "Authorization": "Bearer abcdefghijklmnop"
        };
        //cookie 방식 success
        document.cookie = 'X-TEST-Authorization=hahahahah';

        this.ws.onopen = this.onOpen;
        this.ws.onmessage = this.onMessage;
        this.ws.onclose = this.onClose;
        this.ws.onerror = this.onError;
    }

    /**
     * Disconnection WebSocket
     */
    close() {
        this.ws.close();
    }

    /**
     * Send Message
     * @param payload
     * @returns {boolean}
     */
    send(payload) {
        if (WsClient.isBlank(this.ws)) {
            alert("WebSocket is not connected!!");
            throw "WebSocket is not connected!!";
        }
        if (this.enableLog) console.log('send payload', payload);
        this.payload = payload;
        this.ws.send(this.payload);
    }

    /**
     * get Last Send Message Data
     * @returns {*}
     */
    getPayload() {
        return this.payload;
    }

    /* ==============================================================================
     * EVENTS
     ============================================================================== */
    /**
     * Open EventListener
     * @param msg
     * @param ev
     */
    onOpen(msg, ev) {
        if (this.enableLog) console.log('Unimplemented "onOpen" Function');
        if (this.enableLog) console.log('onOpen', msg, ev);
    }

    /**
     * Receive EventListener
     * @param msg
     * @param ev
     */
    onMessage(msg, ev) {
        if (this.enableLog) console.log('Unimplemented "onMessage" Function');
        if (this.enableLog) console.log('onMessage', msg, ev);
    }

    /**
     * Close EventListener
     * @param msg
     * @param ev
     */
    onClose(msg, ev) {
        if (this.enableLog) console.log('Unimplemented "onClose" Function');
        if (this.enableLog) console.log('onClose', msg, ev);
    }

    /**
     * Error EventListener
     * @param msg
     * @param ev
     */
    onError(msg, ev) {
        if (this.enableLog) console.log('Unimplemented "onError" Function');
        if (this.enableLog) console.log('onError', msg, ev);
    }

}