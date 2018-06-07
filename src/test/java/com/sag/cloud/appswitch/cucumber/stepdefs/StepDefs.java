package com.sag.cloud.appswitch.cucumber.stepdefs;

import com.sag.cloud.appswitch.AppOneApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = AppOneApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
