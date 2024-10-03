package org.bibliotheque.bibliotheque.securite;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bibliotheque.bibliotheque.modele.entity.Auther;
import org.bibliotheque.bibliotheque.modele.entity.Bibliothecaire;
import org.bibliotheque.bibliotheque.modele.entity.Member;
import org.bibliotheque.bibliotheque.repository.AutherRepo;
import org.bibliotheque.bibliotheque.repository.BibliothecaireRepo;
import org.bibliotheque.bibliotheque.repository.MemberRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final AutherRepo autherRepo;
    private final BibliothecaireRepo bibliothecaireRepo;
    private final MemberRepo memberRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Auther> auther = autherRepo.findAutherByEmail(username);
        if (auther.isPresent()) {
            log.info("Found Auther: {}", auther.get());
            return new UtulisateurDetail(auther.get());
        }

        Optional<Bibliothecaire> secretaire = bibliothecaireRepo.findBibliothecaireByEmail(username);
        if (secretaire.isPresent()) {
            log.info("Found Secretaire: {}", secretaire.get());
            return new UtulisateurDetail(secretaire.get());
        }

        Optional<Member> admin = memberRepo.findMemberByEmail(username);
        if (admin.isPresent()) {
            log.info("Found Admin: {}", admin.get());
            return new UtulisateurDetail(admin.get());
        }

        log.warn("User not found: {}", username);
        throw new UsernameNotFoundException("User not found");
    }
}
