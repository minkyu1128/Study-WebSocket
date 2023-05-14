package com.mk1126sj.studywebsocket.blog.gorany.repository;

import com.mk1126sj.studywebsocket.blog.gorany.model.ChatRoomDTO;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ChatRoomRepository {
    private Map<String, ChatRoomDTO> chatRoomDTOMap;

    @PostConstruct  //의존성 주입 완료 후 생성자 초기화 실행
    private void init() {
        chatRoomDTOMap = new LinkedHashMap<>();
    }

    /**
     * 채팅방 생성 최신순으로 반환
     *
     * @return
     */
    public List<ChatRoomDTO> findAllRooms() {
        List<ChatRoomDTO> result = new ArrayList<>(chatRoomDTOMap.values());
        Collections.reverse(result);

        return result;
    }

    /**
     * 채팅방 조회
     *
     * @param roomId
     * @return
     */
    public ChatRoomDTO findRoomById(String roomId) {
        return chatRoomDTOMap.get(roomId);
    }

    /**
     * 채팅방 생성
     *
     * @param name
     * @return
     */
    public ChatRoomDTO createChatRoomDTO(String name) {
        ChatRoomDTO room = ChatRoomDTO.create(name);
        chatRoomDTOMap.put(room.getRoomId(), room);

        return room;
    }
}
