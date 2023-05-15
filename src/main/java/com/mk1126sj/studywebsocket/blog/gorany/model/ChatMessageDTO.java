package com.mk1126sj.studywebsocket.blog.gorany.model;


import lombok.Data;

/**
 * 채팅 메시지 DTO
 */
@Data
public class ChatMessageDTO {
    private String roomId;

    private String userName;
    private String msg;
    private String date;
}
