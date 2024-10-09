package org.bibliotheque.bibliotheque.controller;

import lombok.RequiredArgsConstructor;
import org.bibliotheque.bibliotheque.modele.DTO.res.AdminResDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AutherResDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.BibliothecaireResDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.MemberResDTO;
import org.bibliotheque.bibliotheque.securite.LoginViewModel;
import org.bibliotheque.bibliotheque.service.intrf.AdminService;
import org.bibliotheque.bibliotheque.service.intrf.AutherService;
import org.bibliotheque.bibliotheque.service.intrf.BibliothecaireService;
import org.bibliotheque.bibliotheque.service.intrf.MemberService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class LoginController {

    private final MemberService memberService;
    private final BibliothecaireService bibliothecaireService;
    private final AutherService autherService;
    private final AdminService adminService;


    @PostMapping("/login")
    public Object login(@RequestBody LoginViewModel loginRequest) {
        Optional<MemberResDTO> memberOpt = memberService.findByEmail(loginRequest.getEmail());
        Optional<BibliothecaireResDTO> bibliothecaireOpt = bibliothecaireService.findByEmail(loginRequest.getEmail());
        Optional<AutherResDTO> autherOpt = autherService.findByEmail(loginRequest.getEmail());
        Optional<AdminResDTO> adminOpt = adminService.findByEmail(loginRequest.getEmail());

        if (memberOpt.isPresent()) {
            MemberResDTO member = memberOpt.get();
            if (memberService.verifyPassword(loginRequest.getPassword(), member.getPassword())) {
                return member;
            }
        } else if (bibliothecaireOpt.isPresent()) {
            BibliothecaireResDTO bibliothecaire = bibliothecaireOpt.get();
            if (bibliothecaireService.verifyPassword(loginRequest.getPassword(), bibliothecaire.getPassword())) {
                return bibliothecaire;
            }
        } else if (autherOpt.isPresent()) {
            AutherResDTO auther = autherOpt.get();
            if (autherService.verifyPassword(loginRequest.getPassword(), auther.getPassword())) {
                return auther;
            }
        } else if (adminOpt.isPresent()) {
            AdminResDTO admin = adminOpt.get();
            if (adminService.verifyPassword(loginRequest.getPassword(), admin.getPassword())) {
                return admin;
            }
        }

        return null; // Return null or a proper response when login fails
    }
}
