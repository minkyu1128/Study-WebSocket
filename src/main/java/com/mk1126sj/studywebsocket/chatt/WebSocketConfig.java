package com.mk1126sj.studywebsocket.chatt;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.server.standard.ServerEndpointExporter;

@Component
public class WebSocketConfig {
    /**
     * 싱글톤으로 동작하도록 하기 위한 설정
     *
     * @return
     * @apiNote 일반적으로 스프링에서 Bean들은 싱글톤으로 관리되지만, @ServerEndpoint 어노테이션이 달린 클래스들은
     * WebSocket이 생성될 때마다 인스턴스가 생성되고 JWA 에 의해 관리되기 때문에
     * Spring의 @Autowired가 설정된 멤버들이 초기화 되지 않도록 연결해주고
     * 초기화해주는 클래스가 필요합니다.
     */
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
