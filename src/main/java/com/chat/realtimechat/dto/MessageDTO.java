package com.chat.realtimechat.dto;


import java.time.LocalDateTime;

public record MessageDTO(

        String sender,
        String receiver,
        String content,
        LocalDateTime timestamp
){}