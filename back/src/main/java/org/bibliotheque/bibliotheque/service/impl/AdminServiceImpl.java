package org.bibliotheque.bibliotheque.service.impl;


import lombok.RequiredArgsConstructor;
import org.bibliotheque.bibliotheque.modele.DTO.req.AdminReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AdminResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Admin;
import org.bibliotheque.bibliotheque.modele.mapper.AdminMapper;
import org.bibliotheque.bibliotheque.repository.AdminRepo;
import org.bibliotheque.bibliotheque.securite.UtulisateurDetail;
import org.bibliotheque.bibliotheque.service.intrf.AdminService;
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
public class AdminServiceImpl implements AdminService
        , UserDetailsService {

    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    private final AdminMapper mapper;

    private final AdminRepo repository;

    @Override
    public AdminResDTO save(AdminReqDTO req) {
        Admin emp = mapper.toEntity(req);
        emp.setPassword(this.passwordEncoder.encode(emp.getPassword()));
        emp.setRole("ADMIN");
        emp.setStatut(true);
        repository.save(emp);
        return mapper.toRespDTO(emp);
    }

    @Override
    public AdminResDTO update(AdminReqDTO req) {

        Admin updated = mapper.toEntity(req);
        Optional<Admin> existingAdminOptional = this.repository.findAdminByEmail(updated.getEmail());

        if (existingAdminOptional.isPresent()) {
            Admin existingAdmin = existingAdminOptional.get();

            existingAdmin.setNom(updated.getNom());
            existingAdmin.setPrenom(updated.getPrenom());
            existingAdmin.setTel(updated.getTel());
            existingAdmin.setEmail(updated.getEmail());
            existingAdmin.setUpdatedAt(LocalDateTime.now());
            existingAdmin.setDeletedAt(null);
            existingAdmin.setDateDeNaissance(updated.getDateDeNaissance());

            existingAdmin.setStatut(updated.getStatut());
            Admin savedAdmin = repository.save(existingAdmin);
            return mapper.toRespDTO(savedAdmin);
        }
        return null;
    }

    @Override
    public List<AdminResDTO> findAll() {
        List<Admin> users = this.repository.findAll();
        return mapper.toAllRespDTO(users);
    }

    @Override
    public Optional<AdminResDTO> findById(int id) {
        Optional<Admin> optionalAdmin = this.repository.findById(id);
        if (optionalAdmin.isPresent()) {
            AdminResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
            return Optional.of(AdminResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<AdminResDTO> findByEmail(String email) {
        Optional<Admin> optionalAdmin = this.repository.findAdminByEmail(email);
        if (optionalAdmin.isPresent()) {
            AdminResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
            return Optional.of(AdminResDTO);
        } else {
            return Optional.empty();
        }
    }



    @Override
    public void delete(AdminReqDTO req) {
        Admin emp = this.repository.findById(req.getIdAdmin()).get();
        emp.setDeletedAt(LocalDateTime.now());
        emp.setStatut(false);
        repository.save(emp);
    }

    @Override
    public void deleteById(int id) {
//        Admin emp = this.repository.findById(id).get();
//        emp.setDeletedAt(LocalDateTime.now());
//        emp.setStatut(false);
//        repository.save(emp);
        repository.deleteById(id);
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin user = this.repository.findAdminByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email: " + username));

        return new UtulisateurDetail(user);
    }
    @Override
    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }
}