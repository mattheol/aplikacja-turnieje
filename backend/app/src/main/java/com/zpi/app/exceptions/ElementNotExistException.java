package com.zpi.app.exceptions;

public class ElementNotExistException extends RuntimeException {
    public ElementNotExistException(String message) {
        super(message);
    }
}
