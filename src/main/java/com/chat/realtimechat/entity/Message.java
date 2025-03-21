package com.chat.realtimechat.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sender;
    private String content;
    private String timestamp;
}