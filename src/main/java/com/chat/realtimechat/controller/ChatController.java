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
    //@SendTo("/topic/canal1")
    public InformationDTO sendMessage(MessageDTO messageDTO) {
        System.out.println("El mensaje recibido es: " + messageDTO);
        chatService.save(messageDTO);

        messagingTemplate.convertAndSendToUser(messageDTO.receiver(),
                "/queue/messages", messageDTO);

        return new InformationDTO(messageDTO.content());
    }
}