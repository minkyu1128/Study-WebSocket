package com.mk1126sj.studywebsocket.blog.gorany.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 * 웹소켓 설정
 */
@Configuration
@RequiredArgsConstructor
@EnableWebSocket    //WebSocket 활성화
public class WebSocketConfigType2 implements WebSocketConfigurer {

    private final ChatHandler chatHandler;
    private final SockJsChatHandler sockJsChatHandler;

    @Value("${server.port}")
    private String SERVER_PORT;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        /* =============================================
        * setAllowedOrigins("*") 란?
        *   -. 기본적으로 CORS 는 SOP 에 의해 다른 도메인 서버에서는 접속 불가
        *   -. 모든 도메인에서 접속이 가능하도록 "*" 로 설정
        *   -. 특정 도메인만 열어주고 싶을 경우 해당 도메인만 입력
        * -----------------------------------------------
        * SockJS란?
        *   -. 모든 클라이언트의 브라우저에서 WebSocket을 지원한다는 보장이 없다.
        *   -. 또한, Server/Client 중간에 위치한 Proxy가 Upgrade 헤더를 해석하지 못해 서버에 전달하지 못할 수 있다.
        *   -. Server/Client 중간에 위치한 Proxy가 유후상태에서 도중에 Connection을 종료시킬 수도 있다.
        *   -. 위 문제를 해결하기 위해 나온 것이 WebSocket Emulation인 SockJS다.
        *   -. SockJS는 우선 WebSocket을 시도하고, 실패할 경우 Http Streaming, Long-Polling 같은 HTTP 기반의 다른 기술로 전환해 연결을 시도한다.
        *   -. SockJS 사용 시 서버는 SockJS의 클라이언트의 위치를 알고 있어야 한다.
        ============================================= */
        //WebSocketHandler By Basic
        registry.addHandler(chatHandler, "/ws/chat")    //ServerEndpoint
                .setAllowedOrigins("*") //CORS 시 모든 도메인에서 접근 가능하도록 설정
        ;
        //WebSocketHandler By SockJS
        final String sockJsClientUrl = "https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.min.js";
        registry.addHandler(sockJsChatHandler, "/sj/chat")    //ServerEndpoint
//                .setAllowedOrigins("*") //CORS 시 모든 도메인에서 접근 가능하도록 설정
                .setAllowedOriginPatterns("http://*:" + SERVER_PORT, "http://*.*.*.*:" + SERVER_PORT)
                .withSockJS()  //SockJS 활성화
                .setClientLibraryUrl(sockJsClientUrl) //SockJS 클라이언트 주소
        ;
    }
}
