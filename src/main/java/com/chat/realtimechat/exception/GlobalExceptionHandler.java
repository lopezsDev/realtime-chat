package com.chat.realtimechat.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.dao.DataIntegrityViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Maneja excepciones generales
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleException(Exception e) {
        return "Ocurrió un error inesperado: " + e.getMessage();
    }

    // Maneja errores de base de datos
    @ExceptionHandler(DataIntegrityViolationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleDataIntegrityViolationException(DataIntegrityViolationException e) {
        return "Error de integridad de datos: " + e.getMessage();
    }

    // Maneja errores de WebSocket o problemas de conexión
    @ExceptionHandler(WebSocketException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String handleWebSocketException(WebSocketException e) {
        return "Error en la conexión WebSocket: " + e.getMessage();
    }
}
