package com.chat.realtimechat.controller;

import com.chat.realtimechat.dto.MessageDTO;
import com.chat.realtimechat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private ChatService chatService;

    @MessageMapping("/sendMessage")
    public void sendMessage(MessageDTO messageDTO) {
        chatService.save(messageDTO);
        messagingTemplate.convertAndSend("/topic/messages", messageDTO);
    }

}