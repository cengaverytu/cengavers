package com.cengavers.features.messages.service.Impl;

import com.cengavers.features.messages.dto.MessageDTO;
import com.cengavers.features.messages.dto.converter.MessageDTOConverter;
import com.cengavers.features.messages.entity.Message;
import com.cengavers.features.messages.repository.MessageRepository;
import com.cengavers.features.messages.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final MessageDTOConverter messageDTOConverter;

    @Override
    public void save(MessageDTO request) {
        Message message = new Message();
        message.setId(request.getId());
        message.setContent(request.getContent());
        messageRepository.save(message);
    }
    @Override
    public void updateById(Long id, MessageDTO request) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found id : " + id));
        if (request.getContent() != null && !request.getContent().isBlank()) {
            message.setContent(request.getContent());
        }
        messageRepository.save(message);
    }
    @Override
    public MessageDTO findById(Long id) {
        Message message = messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Message not found id : " + id));
        return messageDTOConverter.convert(message);
    }
    @Override
    public List<MessageDTO> findAll() {
        return messageDTOConverter.convert(messageRepository.findAll());
    }
    @Override
    public void deleteById(Long id) {
        messageRepository.deleteById(id);
    }
}
