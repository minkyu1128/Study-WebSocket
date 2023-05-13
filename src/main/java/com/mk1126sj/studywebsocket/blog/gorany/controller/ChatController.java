package com.mk1126sj.studywebsocket.blog.gorany.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Slf4j
@Controller
public class ChatController {

    @GetMapping("/chat")
    public String chatBasic() {
        log.info("@ChatController, chat Basic()");
        return "gorany/chat";
    }

}
