package com.patrihub.patri_hub_api.dto;

public class MessageResponse {
    private String message; 
    private Object data; 
 

    public MessageResponse(String message, Object data) {
        this.message = message;
        this.data = data;
       
    }

    public String getMessage() {
        return message;
    }

    public Object getData() {
        return data;
    }
}
//mvn spring-boot:run