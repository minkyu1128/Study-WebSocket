/**
 * Stomp Client Util
 *  -. WebSocket과 SockJS 방식을 지원 한다.
 *  -. SockJS 사용 시 sockjs-client 라이브러리가 필요 하다
 *      ex)
 *        <script src='https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.min.js'></script>
 *        <script src="https://cdn.jsdelivr.net/npm/sockjs-client@1/dist/sockjs.min.js"></script>
 *  -. Stomp 사용 시 stomp.js 라이브러리가 필요 하다.
 *      ex)
 *        <script src="https://cdnjs.cloudflare.com/ajax/libs/stomp.js/2.3.3/stomp.min.js"></script>
 * @Author mk.park
 * @Date 2023.05.14.
 */
class StompClient {
    constructor(props) {
        this.enableLog = StompClient.isBlank(props.enableLog) ? false : props.enableLog;
        this.wsType = props.wsType;
        this.serverEndPoint = props.serverEndPoint;
        this.conn = {};
        this.conn.sub = {};
        this.conn.headers = StompClient.isBlank(props.conn.headers) ? {} : props.conn.headers;
        this.conn.callback = StompClient.isBlank(props.conn.callback) ? () => {
        } : props.conn.callback;
        this.conn.sub.dest = props.conn.sub.dest;
        this.conn.sub.callback = props.conn.sub.callback;
        console.log('props', props);
        if (!StompClient.isBlank(props.onOpen)) this.onOpen = props.onOpen;
        if (!StompClient.isBlank(props.onMessage)) this.onMessage = props.onMessage;
        if (!StompClient.isBlank(props.onClose)) this.onClose = props.onClose;
        if (!StompClient.isBlank(props.onError)) this.onError = props.onError;
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
        WSSTP: 'WebSocket Stomp',
        SJSTP: 'WebSocket SockJS Stomp',

        valueOf(value) {
            if (StompClient.isBlank(StompClient.wsType[value])) {
                alert('no matching value');
                // return false;
                throw 'no matching value. value is "' + value + '"';
            }
            return StompClient.wsType[value];
        },

        isStomp(value) {
            switch (value) {
                case this.WSSTP:
                case this.SJSTP:
                    return true;
                default:
                    return false;
            }
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
        if (this.wsType === StompClient.wsType.WSSTP)
            this.ws = new WebSocket("ws://" + this.serverEndPoint + "?type=WSSTP");
        else if (this.wsType === StompClient.wsType.SJSTP)
            // this.ws = new SockJS(this.serverEndPoint + "?type=SJSTP", null, {transports: ["websocket", "xhr-streaming", "xhr-polling"]});
            this.ws = new SockJS("/stomp/chat");
        else {
            alert("WebSocket This call type is required!!");
            return false;
        }

        // this.ws.onopen = this.onOpen;
        // this.ws.onmessage = this.onMessage;
        // this.ws.onclose = this.onClose;
        // this.ws.onerror = this.onError;

        // this.stomp = Stomp.client("ws://" + this.serverEndPoint);
        let _instance = this;
        this.stomp = Stomp.over(this.ws);
        console.log('_instance.conn.sub.desc', _instance.conn.sub.dest);
        console.log('_instance.conn.sub.callback',_instance.conn.sub.callback);
        this.stomp.connect(this.conn.headers, function () {
            _instance.stomp.subscribe(_instance.conn.sub.dest, _instance.conn.sub.callback)
            _instance.conn.callback();
        });
        // this.stomp.disconnect = this.disconnect;
        // this.stomp.begin = this.begin;
        // this.stomp.commit = this.commit;
        // this.stomp.abort = this.abort;
        // this.stomp.debug = this.debug;
        // this.stomp.subscribe = this.subscribe;
        // this.stomp.unsubscribe = this.unsubscribe;
        // this.stomp.ack = this.ack;
        // this.stomp.nack = this.nack;
    }


    // /**
    //  * Stomp Connection
    //  */
    // connect() {
    //     this.stomp.conn();
    // }

    /**
     * Stomp Disconnection
     * @param disconnectCallback
     * @param headers
     */
    disconnect(disconnectCallback, headers) {
        this.stomp.disconnect(disconnectCallback, headers);
    }

    /**
     * Send Message
     *  -. 헤더는 구독자가 사용할 수 있습니다.
     *  -. 그러나 STOMP 브로커에 해당하는 특수목적 헤더가 있을 수 있습니다.
     * @param payload
     * @returns {boolean}
     */
    send(path, headers, payload) {
        if (StompClient.isBlank(this.ws)) {
            alert("WebSocket is not connected!!");
            throw "WebSocket is not connected!!";
        }
        if (this.enableLog) console.log('send payload', payload);
        this.path = path;
        this.headers = headers;
        this.payload = payload;
        this.stomp.send(this.path, this.headers, this.payload);
    }

    /**
     * get Last Send Message Data
     * @returns {*}
     */
    getPayload() {
        return this.payload;
    }

    /**
     * 시작
     *  -. 트랜잭션을 시작 합니다.
     * @param transactionId
     */
    begin(transactionId) {
        this.stomp.begin(transactionId);
    }

    /**
     * 커밋
     *  -. 트랜잭션을 커밋 합니다.
     *  -. 시작(begin) 시 반환된 개체를 직접 호출하여 트랜잭션을 커밋하는 것이 좋습니다.
     * @param transactionId
     */
    commit(transactionId) {
        this.stomp.commit(transactionId);
    }

    /**
     * 중단
     *  -. 트랜잭션을 중단 합니다.
     *  -. 시작(begin) 시 반환된 개체를 직접 호출하여 트랜잭션을 커밋하는 것이 좋습니다.
     * @param transactionId
     */
    abort(transactionId) {
        this.stomp.abort(transactionId);
    }

    /**
     * 디버그
     *  -. WebSocket을 통한 STOMP 프레임의 모든 실제 전송에 대해 호출
     * @param message
     */
    debug(message) {
        this.stomp.debug(message);
    }

    /**
     * 구독
     *  -. 클라이언트가 서버로부터 STOMP 메시지를 수신할 때 호출됩니다.
     * @param destination
     * @param callback
     * @param headers
     */
    subscribe(destination, callback, headers) {
        // this.stomp.subscribe(messageID, subscription, headers);
        if (this.enableLog) console.log('Unimplemented "subscribe" Function');
        if (this.enableLog) console.log('subscribe', destination, callback, headers);
    }

    /**
     * 구독 취소
     *  -. 구독 시 반환된 개체를 직접 호출하여 구독을 취소하는 것이 좋습니다.
     * @param id
     */
    unsubscribe(id) {
        this.stomp.unsubscribe(id);
    }

    /**
     * ack 메시지
     *  -. 구독 callback 에 의해 처리되는 메시지를 직접 호출하여 메시지를 확인 하는 것이 좋습니다.
     * @param messageID
     * @param subscription
     * @param headers
     */
    ack(messageID, subscription, headers) {
        this.stomp.ack(messageID, subscription, headers);
    }

    /**
     * nack 메시지
     *  =. 구독 callback 에 의해 처리되는 메시지를 직접 호출하여 메시지를 확인 하는 것이 좋습니다.
     * @param messageID
     * @param subscription
     * @param headers
     */
    nack(messageID, subscription, headers) {
        this.stomp.nack(messageID, subscription, headers);
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