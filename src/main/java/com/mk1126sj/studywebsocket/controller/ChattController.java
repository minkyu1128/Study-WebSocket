package com.mk1126sj.studywebsocket.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@Slf4j
@RestController
public class ChattController {

    @RequestMapping("/mychatt")
    public ModelAndView chatt() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("chatt/chatting");
        return mv;
    }
}
