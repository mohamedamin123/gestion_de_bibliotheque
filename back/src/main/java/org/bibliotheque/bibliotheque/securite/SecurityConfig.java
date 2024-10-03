package org.bibliotheque.bibliotheque.securite;


import lombok.RequiredArgsConstructor;
import org.bibliotheque.bibliotheque.service.impl.AutherServiceImpl;
import org.bibliotheque.bibliotheque.service.impl.BibliothecaireServiceImpl;
import org.bibliotheque.bibliotheque.service.impl.MemberServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final MemberServiceImpl memberService;
    private final BibliothecaireServiceImpl bibliothecaireService;
    private final AutherServiceImpl autherService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(HttpMethod.POST, "/login").permitAll() // Allow login requests
                        .requestMatchers("/members/member/save").permitAll() // Allow member save requests
                        .requestMatchers("/members/member/**").hasRole("MEMBER") // Ensure role is prefixed
                        .requestMatchers("/bibliothecaires/bibliothecaire/**").hasAnyRole("MEMBER", "BIBLIOTHECAIRE") // Roles for bibliothecaires
                        .requestMatchers("/authers/auther/**").hasRole("AUTHER") // Role AUTHER for /authers/auther/**
                        .anyRequest().authenticated() // Require authentication for all other requests
                )
                .httpBasic(withDefaults()) // Use HTTP Basic Authentication
                .csrf(AbstractHttpConfigurer::disable) // Disable CSRF protection for REST API
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // Use stateless sessions
                );

        return http.build();
    }


    @Bean
    public UserDetailsService userDetailsService() {
        return username -> {
            System.out.println("Attempting to load user: " + username);

            UserDetails user = null;

            try {
                user = autherService.loadUserByUsername(username);
                if (user != null) {

                    return user;
                }
            } catch (Exception e) {

            }

            try {
                user = bibliothecaireService.loadUserByUsername(username);
                if (user != null) {
                    return user;
                }
            } catch (Exception e) {
            }

            try {
                user = memberService.loadUserByUsername(username);
                if (user != null) {

                    return user;
                }
            } catch (Exception e) {
                System.out.println("Error in memberService: " + e.getMessage());
            }

            System.out.println("User not found");
            throw new UsernameNotFoundException("User not found");
        };
    }



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService());
        provider.setPasswordEncoder(passwordEncoder());
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return http.getSharedObject(AuthenticationManagerBuilder.class)
                .authenticationProvider(daoAuthenticationProvider())
                .build();
    }
}