package com.cengavers.features.auth.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class signUpRequest {
    private  String username;
    private  String password;
}
