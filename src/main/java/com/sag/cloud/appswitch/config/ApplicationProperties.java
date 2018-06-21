package com.sag.cloud.appswitch.config;

import io.github.jhipster.config.JHipsterDefaults;
import io.github.jhipster.config.JHipsterProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;

import javax.validation.constraints.NotNull;

/**
 * Properties specific to App One.
 * <p>
 * Properties are configured in the application.yml file.
 * See {@link io.github.jhipster.config.JHipsterProperties} for a good example.
 */
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = false)
public class ApplicationProperties {

    private final AppTwo appTwo = new AppTwo();

    public static class AppTwo {

        private final JHipsterProperties.Security security = new JHipsterProperties.Security();

        public JHipsterProperties.Security getSecurity() {
            return security;
        }
    }

    public AppTwo getAppTwo() {
        return appTwo;
    }
}
