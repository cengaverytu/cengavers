package com.cengavers.features.messages.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@Table(name = "SYSTEM_MESSAGES")
@NoArgsConstructor
@Entity
public class Message {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "CONTENT", nullable = false, length = 500)
    private String content;
}
