package com.mk1126sj.studywebsocket.blog.gorany.controller;

import com.mk1126sj.studywebsocket.blog.gorany.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Slf4j
@Controller
@RequiredArgsConstructor
public class RoomController {
    private final ChatRoomRepository chatRoomRepository;

    /**
     * 채팅방 목록 조회
     *
     * @return
     */
    @GetMapping(value = "/chat/rooms")
    public ModelAndView rooms() {
        log.info("# All Chat Rooms");

        ModelAndView mv = new ModelAndView();
        mv.setViewName("gorany/chat/rooms");
        mv.addObject("list", chatRoomRepository.findAllRooms());

        return mv;
    }

    /**
     * 채팅방 개설
     *
     * @param name 채팅방 이름
     * @param rttr 페이지 리다이렉트 Paramter
     * @return
     */
    @PostMapping(value = "/chat/room")
    public String create(@RequestParam String name, RedirectAttributes rttr) {
        log.info("# Create Chat Room, name: " + name);

        rttr.addFlashAttribute("chatRoomDTO", chatRoomRepository.createChatRoomDTO(name));

        return "redirect:/chat/rooms";
    }

    /**
     * 채팅방 조회
     *
     * @param roomId 채팅방 ID
     * @param model  Response Model
     */
    @GetMapping(value = "/chat/room")
    public String getRoom(String roomId, Model model) {
        log.info("# get Chat Room, roomID : " + roomId);

        model.addAttribute("chatRoomDTO", chatRoomRepository.findRoomById(roomId));
        return "gorany/chat/room";
    }
}
