package com.sag.cloud.appswitch.web.rest.vm;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * Created by VDE on 6/13/2018.
 */
public class UserInfo {

    @NotNull
    @Size(min = 1, max = 50)
    private String username;


    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
            "username='" + username + '\'' +
            '}';
    }


}
