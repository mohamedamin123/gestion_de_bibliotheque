package org.bibliotheque.bibliotheque.service.impl;


import lombok.RequiredArgsConstructor;
import org.bibliotheque.bibliotheque.modele.DTO.req.AutherReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AutherResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Auther;
import org.bibliotheque.bibliotheque.modele.mapper.AutherMapper;
import org.bibliotheque.bibliotheque.repository.AutherRepo;
import org.bibliotheque.bibliotheque.securite.UtulisateurDetail;
import org.bibliotheque.bibliotheque.service.intrf.AutherService;
import org.springframework.context.annotation.Primary;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class AutherServiceImpl implements AutherService
        , UserDetailsService {

    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    private final AutherMapper mapper;

    private final AutherRepo repository;

    @Override
    public AutherResDTO save(AutherReqDTO req) {
        Auther emp = mapper.toEntity(req);
        emp.setPassword(this.passwordEncoder.encode(emp.getPassword()));
        emp.setRole("AUTHER");
        emp.setStatut(true);
        repository.save(emp);
        return mapper.toRespDTO(emp);
    }

    @Override
    public AutherResDTO update(AutherReqDTO req) {
        Auther updated = mapper.toEntity(req);
        Optional<Auther> existingAutherOptional = this.repository.findAutherByEmail(updated.getEmail());

        if (existingAutherOptional.isPresent()) {
            Auther existingAuther = existingAutherOptional.get();

            existingAuther.setNom(updated.getNom());
            existingAuther.setPrenom(updated.getPrenom());
            existingAuther.setTel(updated.getTel());
            existingAuther.setEmail(updated.getEmail());
            existingAuther.setNationalite(updated.getNationalite());
            existingAuther.setUpdatedAt(LocalDateTime.now());
            existingAuther.setDeletedAt(null);
            existingAuther.setStatut(true);
            Auther savedAuther = repository.save(existingAuther);
            return mapper.toRespDTO(savedAuther);
        }
        return null;
    }

    @Override
    public List<AutherResDTO> findAll() {
        List<Auther> users = this.repository.findAll();
        return mapper.toAllRespDTO(users);
    }

    @Override
    public Optional<AutherResDTO> findById(int id) {
        Optional<Auther> optionalAdmin = this.repository.findById(id);
        if (optionalAdmin.isPresent()) {
            AutherResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
            return Optional.of(AdminResDTO);
        } else {
            return Optional.empty();
        }    }

    @Override
    public Optional<AutherResDTO> findByEmail(String email) {
        Optional<Auther> optionalAdmin = this.repository.findAutherByEmail(email);
        if (optionalAdmin.isPresent()) {
            AutherResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
            return Optional.of(AdminResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<AutherResDTO> findByTel(List<String> tel) {
        Optional<Auther> optionalAdmin = this.repository.findAutherByTel(tel);
        if (optionalAdmin.isPresent()) {
            AutherResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
            return Optional.of(AdminResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public List<AutherResDTO> findByPrenomOrNom(String prenom, String nom) {
        List<Auther> liste = this.repository.findAuthersByPrenomOrNom(prenom, nom);
        return mapper.toAllRespDTO(liste);
    }


    @Override
    public void delete(AutherReqDTO req) {
        Auther emp = this.repository.findById(req.getIdAuther()).get();
        emp.setDeletedAt(LocalDateTime.now());
        emp.setStatut(false);
        repository.save(emp);
    }

    @Override
    public void deleteById(int id) {
        Auther emp = this.repository.findById(id).get();
        emp.setDeletedAt(LocalDateTime.now());
        emp.setStatut(false);
        repository.save(emp);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Auther user = this.repository.findAutherByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email: " + username));

        return new UtulisateurDetail(user);
    }
}