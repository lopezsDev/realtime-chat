package com.chat.realtimechat.dto;


public record MessageDTO(

        String sender,
        String content,
        String timestamp
){}