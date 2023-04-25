package com.IMS.IMS_app.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/students/**")
                        .allowedMethods("GET", "POST", "PUT", "DELETE") // Add DELETE method
                        .allowedOrigins("*")
                        .allowedHeaders("*");
            }
        };
    }
}
