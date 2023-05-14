package com.mk1126sj.studywebsocket.blog.gorany.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/**
 * STOMP 를 사용하기 위한 WebSocket 설정
 */
@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker   //WebSocket 메시지브로커 활성화(Stomp 를 사용하기 위해 선언)
public class WebSocketConfigStomp implements WebSocketMessageBrokerConfigurer {

    @Value("${server.port}")
    private String SERVER_PORT;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        registry.addEndpoint("/example").withSockJS();
        registry.addEndpoint("/stomp/chat") //ServerEndpoint
//                .setAllowedOrigins("*") //CORS 시 모든 도메인에서 접근 가능하도록 설정
                .setAllowedOriginPatterns("http://*:" + SERVER_PORT, "http://*.*.*.*:" + SERVER_PORT)
                .withSockJS();  //SockJS 활성화
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        /* =============================================
        * setApplicationDestinationPrefixes 란?
        *   -. Client의 Send 요청을 처리
        * -----------------------------------------------
        * enableSimpleBroker ?
        *   -. 해당 경로로 SimpleBroker를 등록.
        *   -. SimpleBroker는 해당 경로를 SUBSCRIBE하는 Client에게 메세지를 전달하는 간단한 작업을 수행
        * -----------------------------------------------
        * enableStompBrokerRelay 란?
        *   -. SimpleBroker의 기능과 외부 Message Broker(RabbitMQ, ActiveMQ 등)에 메세지를 전달하는 기능을 가짐
        ============================================= */
//        config.setApplicationDestinationPrefixes("/test");
//        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/pub");   //Application 목적지 prifix
        config.enableSimpleBroker("/sub");  //Subscribe 목적지 prefix
//        config.enableStompBrokerRelay();
    }

}
