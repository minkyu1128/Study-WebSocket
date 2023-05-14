package com.mk1126sj.studywebsocket.blog.gorany.controller;

import com.mk1126sj.studywebsocket.blog.gorany.model.ChatMessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

/**
 * Stomp 채팅 Controller
 * <pre>
 * </pre>
 */
@Controller
@RequiredArgsConstructor
public class StompChatController {

    private final SimpMessagingTemplate template;   //특정 Broker로 메세지를 전달

    /**
     * 채팅방 입장 중계
     *
     * @param messageDTO
     */
    @MessageMapping(value = "/chat/enter")
    public void enter(ChatMessageDTO messageDTO) {
        messageDTO.setMessage(String.format("%s 님이 채팅방에 참여하였습니다.", messageDTO.getWriter()));
        template.convertAndSend(String.format("/sub/chat/room/%s", messageDTO.getRoomId()), messageDTO);
    }

    /**
     * 채팅방 메시지전달 중계
     *
     * @param messageDTO
     */
    @MessageMapping(value = "/chat/message")
    public void message(ChatMessageDTO messageDTO) {
        template.convertAndSend(String.format("/sub/chat/room/%s", messageDTO.getRoomId()), messageDTO);
    }

}
