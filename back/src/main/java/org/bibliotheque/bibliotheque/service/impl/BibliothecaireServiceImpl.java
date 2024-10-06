package org.bibliotheque.bibliotheque.service.impl;


import lombok.RequiredArgsConstructor;
import org.bibliotheque.bibliotheque.modele.DTO.req.BibliothecaireReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.BibliothecaireResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Auther;
import org.bibliotheque.bibliotheque.modele.entity.Bibliothecaire;
import org.bibliotheque.bibliotheque.modele.mapper.BibliothecaireMapper;
import org.bibliotheque.bibliotheque.repository.BibliothecaireRepo;
import org.bibliotheque.bibliotheque.securite.UtulisateurDetail;
import org.bibliotheque.bibliotheque.service.intrf.BibliothecaireService;
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
public class BibliothecaireServiceImpl implements BibliothecaireService
        , UserDetailsService {

    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    private final BibliothecaireMapper mapper;

    private final BibliothecaireRepo repository;

    @Override
    public BibliothecaireResDTO save(BibliothecaireReqDTO req) {
        Bibliothecaire emp = mapper.toEntity(req);
        emp.setPassword(this.passwordEncoder.encode(emp.getPassword()));
        emp.setRole("BIBLIOTHECAIRE");
        emp.setStatut(true);
        repository.save(emp);
        return mapper.toRespDTO(emp);
    }

    @Override
    public BibliothecaireResDTO update(BibliothecaireReqDTO req) {
        Bibliothecaire updated = mapper.toEntity(req);
        Optional<Bibliothecaire> existingBibliothecaireOptional = this.repository.findBibliothecaireByEmail(updated.getEmail());

        if (existingBibliothecaireOptional.isPresent()) {
            Bibliothecaire existingBibliothecaire = existingBibliothecaireOptional.get();

            existingBibliothecaire.setNom(updated.getNom());
            existingBibliothecaire.setPrenom(updated.getPrenom());
            existingBibliothecaire.setTel(updated.getTel());
            existingBibliothecaire.setEmail(updated.getEmail());
            existingBibliothecaire.setMatricule(updated.getMatricule());
            existingBibliothecaire.setStatut(updated.getStatut());
            existingBibliothecaire.setUpdatedAt(LocalDateTime.now());
            existingBibliothecaire.setDeletedAt(null);

            Bibliothecaire savedBibliothecaire = repository.save(existingBibliothecaire);
            return mapper.toRespDTO(savedBibliothecaire);
        }
        return null;
    }

    @Override
    public List<BibliothecaireResDTO> findAll() {
        List<Bibliothecaire> users = this.repository.findAll();
        return mapper.toAllRespDTO(users);
    }

    @Override
    public Optional<BibliothecaireResDTO> findById(int id) {
        Optional<Bibliothecaire> optionalAdmin = this.repository.findById(id);
        if (optionalAdmin.isPresent()) {
            BibliothecaireResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
            return Optional.of(AdminResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<BibliothecaireResDTO> findByEmail(String email) {
        Optional<Bibliothecaire> optionalAdmin = this.repository.findBibliothecaireByEmail(email);
        if (optionalAdmin.isPresent()) {
            BibliothecaireResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
            return Optional.of(AdminResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<BibliothecaireResDTO> findByTel(List<String> tel) {
        Optional<Bibliothecaire> optionalAdmin = this.repository.findBibliothecaireByTel(tel);
        if (optionalAdmin.isPresent()) {
            BibliothecaireResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
            return Optional.of(AdminResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public List<BibliothecaireResDTO> findByPrenomOrNom(String prenom, String nom) {
        List<Bibliothecaire> liste = this.repository.findBibliothecairesByPrenomOrNom(prenom, nom);
        return mapper.toAllRespDTO(liste);
    }


    @Override
    public void delete(BibliothecaireReqDTO req) {
        Bibliothecaire emp = this.repository.findById(req.getIdBibliothecaire()).get();
        emp.setDeletedAt(LocalDateTime.now());
        emp.setStatut(false);
        repository.save(emp);

    }

    @Override
    public void deleteById(int id) {
//        Bibliothecaire emp = this.repository.findById(id).get();
//        emp.setDeletedAt(LocalDateTime.now());
//        emp.setStatut(false);
//        repository.save(emp);
        repository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Bibliothecaire user = this.repository.findBibliothecaireByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email: " + username));

        return new UtulisateurDetail(user);
    }
    @Override
    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

}