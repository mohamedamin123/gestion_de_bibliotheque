package org.bibliotheque.bibliotheque.service.impl;


import lombok.RequiredArgsConstructor;
import org.bibliotheque.bibliotheque.modele.DTO.req.MemberReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.MemberResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Bibliothecaire;
import org.bibliotheque.bibliotheque.modele.entity.Member;
import org.bibliotheque.bibliotheque.modele.mapper.MemberMapper;
import org.bibliotheque.bibliotheque.repository.MemberRepo;
import org.bibliotheque.bibliotheque.securite.UtulisateurDetail;
import org.bibliotheque.bibliotheque.service.intrf.MemberService;
import org.springframework.context.annotation.Primary;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService
        , UserDetailsService {

    private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    private final MemberMapper mapper;

    private final MemberRepo repository;

    @Override
    public MemberResDTO save(MemberReqDTO req) {
        System.out.println(req.getTel());
        Member emp = mapper.toEntity(req);
        System.out.println(emp.getTel());
        emp.setPassword(this.passwordEncoder.encode(emp.getPassword()));
        emp.setRole("MEMBER");
        emp.setStatut(true);
        emp.setDateInscription(LocalDate.now());
        emp.setTel(req.getTel());
        repository.save(emp);
        return mapper.toRespDTO(emp);
    }

    @Override
    public MemberResDTO update(MemberReqDTO req) {
        Member updated = mapper.toEntity(req);
        Optional<Member> existingMemberOptional = this.repository.findMemberByEmail(updated.getEmail());

        if (existingMemberOptional.isPresent()) {
            Member existingMember = existingMemberOptional.get();

            existingMember.setNom(updated.getNom());
            existingMember.setPrenom(updated.getPrenom());
            existingMember.setTel(updated.getTel());
            existingMember.setEmail(updated.getEmail());
            existingMember.setDateDeNaissance(updated.getDateDeNaissance());
            existingMember.setDateInscription(updated.getDateInscription());
            existingMember.setStatut(updated.getStatut());

            existingMember.setUpdatedAt(LocalDateTime.now());
            existingMember.setDeletedAt(null);
            Member savedMember = repository.save(existingMember);
            return mapper.toRespDTO(savedMember);
        }
        return null;
    }

    @Override
    public MemberResDTO updatePassword(MemberReqDTO req) {
        Member updated = mapper.toEntity(req);
        Optional<Member> existingMemberOptional = this.repository.findMemberByEmail(updated.getEmail());

        if (existingMemberOptional.isPresent()) {
            Member existingMember = existingMemberOptional.get();
            existingMember.setPassword(this.passwordEncoder.encode(req.getPassword()));
            existingMember.setUpdatedAt(LocalDateTime.now());
            existingMember.setDeletedAt(null);
            existingMember.setStatut(true);
            Member savedMember = repository.save(existingMember);
            return mapper.toRespDTO(savedMember);
        }
        return null;
    }

    @Override
    public List<MemberResDTO> findAll() {
        List<Member> users = this.repository.findAll();
        return mapper.toAllRespDTO(users);
    }

    @Override
    public Optional<MemberResDTO> findById(int id) {
        Optional<Member> optionalAdmin = this.repository.findById(id);
        if (optionalAdmin.isPresent()) {
            MemberResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
            return Optional.of(AdminResDTO);
        } else {
            return Optional.empty();
        }    }

    @Override
    public Optional<MemberResDTO> findByEmail(String email) {
        Optional<Member> optionalAdmin = this.repository.findMemberByEmail(email);
        if (optionalAdmin.isPresent()) {
            MemberResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
            return Optional.of(AdminResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public Optional<MemberResDTO> findByTel(List<String> tel) {
        Optional<Member> optionalAdmin = this.repository.findMemberByTel(tel);
        if (optionalAdmin.isPresent()) {
            MemberResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
            return Optional.of(AdminResDTO);
        } else {
            return Optional.empty();
        }
    }

    @Override
    public List<MemberResDTO> findByPrenomOrNom(String prenom, String nom) {
        List<Member> liste = this.repository.findMembersByPrenomOrNom(prenom, nom);
        return mapper.toAllRespDTO(liste);
    }


    @Override
    public void delete(MemberReqDTO req) {
        Member emp = this.repository.findById(req.getIdMember()).get();
        emp.setDeletedAt(LocalDateTime.now());
        emp.setStatut(false);
        repository.save(emp);
    }

    @Override
    public void deleteById(int id) {
//        Member emp = this.repository.findById(id).get();
//        emp.setDeletedAt(LocalDateTime.now());
//        emp.setStatut(false);
//        repository.save(emp);
        repository.deleteById(id);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member user = this.repository.findMemberByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec l'email: " + username));

        return new UtulisateurDetail(user);
    }
    @Override
    public boolean verifyPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

}