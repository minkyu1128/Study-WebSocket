package com.mk1126sj.studywebsocket.chatt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.websocket.*;
import javax.websocket.server.ServerEndpoint;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Slf4j
@Service
@ServerEndpoint(value = "/chatt")   //RequestMapping과 같은 웹소켓 EndPoint 역할을 함
public class WebSocketChatt {

    /**
     * 서버와 클라이언트간 1:N 통신이 가능하도록 하기 위해
     * 연결된 Client Session 을 저장하기 위한 변수
     */
    private static Set<Session> clientSessions = Collections.synchronizedSet(new HashSet<Session>());

    /**
     * 클라이언트 세션 연결
     *
     * @param session
     * @apiNote 실행시점: 클라이언트가 @ServerEndpoint로 서버에 접속 시 실행
     */
    @OnOpen
    public void onOpen(Session session) {
//        session.setMaxIdleTimeout(0);   //세션에 대한 연결 유휴시간(s). 0 설정 시 무제한
        log.info("open session : " + session.toString());
        if (!clientSessions.contains(session)) {
            clientSessions.add(session);
            log.info("session open : " + session);
        } else {
            log.info("이미 연결된 session 임!!!");
        }
        this.printSessionInfo(session);
    }

    private void printSessionInfo(Session session) {

        String info = new StringBuffer()
                .append("==================================================================")
                .append(System.getProperty("line.separator"))
                .append("Session Info")
                .append(System.getProperty("line.separator"))
                .append("------------------------------------------------------------------")
                .append(System.getProperty("line.separator"))
                .append("session.getId()").append(": ").append(session.getId())
                .append(System.getProperty("line.separator"))
                .append("session.getRequestURI().toString()").append(": ").append(session.getRequestURI().toString())
                .append(System.getProperty("line.separator"))
                .append("session.getMaxBinaryMessageBufferSize()").append(": ").append(session.getMaxBinaryMessageBufferSize())
                .append(System.getProperty("line.separator"))
                .append("session.getMaxIdleTimeout()").append(": ").append(session.getMaxIdleTimeout())
                .append(System.getProperty("line.separator"))
                .append("session.getNegotiatedSubprotocol()").append(": ").append(session.getNegotiatedSubprotocol())
                .append(System.getProperty("line.separator"))
                .append("session.getProtocolVersion()").append(": ").append(session.getProtocolVersion())
                .append(System.getProperty("line.separator"))
                .append("session.getMaxTextMessageBufferSize()").append(": ").append(session.getMaxTextMessageBufferSize())
                .append(System.getProperty("line.separator"))
                .append("session.getQueryString()").append(": ").append(session.getQueryString())
                .append(System.getProperty("line.separator"))
                .append("session.getAsyncRemote().toString()").append(": ").append(session.getAsyncRemote().toString())
                .append(System.getProperty("line.separator"))
                .append("session.getBasicRemote().toString()").append(": ").append(session.getBasicRemote().toString())
                .append(System.getProperty("line.separator"))
                .append("session.getUserPrincipal().getName()").append(": ").append(session.getUserPrincipal() == null ? null : session.getUserPrincipal().getName())
                .append(System.getProperty("line.separator"))
                .append("==================================================================")
                .toString();
        System.out.println(info);
    }


    /**
     * WebSocketChatt 클래스의 onMessage 메서드에 의해 clients 에 있는 모든 session에 메시지를 전달
     *
     * @param msg
     * @param session
     * @throws Exception
     * @apiNote 실행시점: 클라이언트로부터 메시지가 전달되었을 때 실행
     */
    @OnMessage
    public void onMessage(String msg, Session session) throws Exception {
        log.info("receive message : " + msg);
        for (Session s : clientSessions) {
            log.info("send data : " + msg);
            s.getBasicRemote().sendText(msg);
        }
    }


    /**
     * 클라이언트 세션 종료
     *
     * @param session
     * @apiNote 실행시점: 클라이언트가 url을 바꾸거나 브라우저 종료 시 자동으로 onClose() 메서드가 실행
     */
    @OnClose
    public void onClose(Session session) {
        log.info("session close : " + session);
        clientSessions.remove(session);
    }

    /**
     * 에러 발생
     *
     * @param e
     * @apiNote 실행시점: 에러가 발생하는 시점에 실행
     */
    @OnError
    public void onError(Throwable e) {
        log.info("session errror : " + e.getMessage());
        e.printStackTrace();
    }
}
