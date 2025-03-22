package com.chat.realtimechat.service;

import com.chat.realtimechat.dto.MessageDTO;
import com.chat.realtimechat.entity.Message;
import com.chat.realtimechat.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private MessageRepository messageRepository;

    public void save(MessageDTO messageDTO) {
        Message message = new Message();
        message.setSender(messageDTO.sender());
        message.setReceiver(messageDTO.receiver());
        message.setContent(messageDTO.content());
        message.setTimestamp(messageDTO.timestamp());
        messageRepository.save(message);
    }
}