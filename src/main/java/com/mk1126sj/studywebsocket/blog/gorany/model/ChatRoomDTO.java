package com.mk1126sj.studywebsocket.blog.gorany.model;

import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

/**
 * 채팅방 DTO
 */
@Data
public class ChatRoomDTO {
    private String roomId;
    private String name;
    /**
     * Websocket Connection이 맺어진 세션 목록
     */
    private Set<WebSocketSession> sessions = new HashSet<>();

    public static ChatRoomDTO create(String name) {
        ChatRoomDTO room = new ChatRoomDTO();

        room.roomId = UUID.randomUUID().toString();
        room.name = name;
        return room;
    }
}
