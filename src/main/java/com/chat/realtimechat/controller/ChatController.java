package com.chat.realtimechat.controller;

import com.chat.realtimechat.dto.InformationDTO;
import com.chat.realtimechat.dto.MessageDTO;
import com.chat.realtimechat.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private ChatService chatService;

    @MessageMapping("/chat1")
    @SendTo("/topic/messages")
    public MessageDTO sendMessage(MessageDTO messageDTO) {
        System.out.println("Mensaje recibido: " + messageDTO);

        chatService.save(messageDTO);
        return messageDTO;
    }
}