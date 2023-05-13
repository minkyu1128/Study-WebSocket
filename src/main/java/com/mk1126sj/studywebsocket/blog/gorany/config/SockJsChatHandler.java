package com.mk1126sj.studywebsocket.blog.gorany.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.ArrayList;
import java.util.List;

/**
 * Text기반 Websocket 핸들러
 */
@Slf4j
@Component
public class SockJsChatHandler extends TextWebSocketHandler {

    private static List<WebSocketSession> sessions = new ArrayList<>();

    /**
     * 클라이언트 접속 시 호출
     *
     * @param session
     * @throws Exception
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        sessions.add(session);
        log.info(session + " 클라이언트 접속");
    }

    /**
     * 연결된 클라이언트로 부터 메시지가 전달 되었을 때
     * <pre>
     * payload 란??
     *  -. 전송되는 데이터를 의미
     *  -. 데이터 전송 시 Header 와 META 데이터, 에러 체크 비트 등과 같은 다양한 요소들을 함께 보내 데이터 전송 효율과 안정성을 높일 수 있다.
     * </pre>
     * @param session
     * @param message
     * @throws Exception
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("payload : " + payload);

        //연결된 모든 클라이언트에게 메시지 전송
        for (WebSocketSession s : sessions) {
            s.sendMessage(message);
        }
    }


    /**
     * 클라이언트 접속 해제 시 호출
     *
     * @param session
     * @param status
     * @throws Exception
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info(session + " 클라이언트 접속 해제");
        sessions.remove(session);
    }
}
