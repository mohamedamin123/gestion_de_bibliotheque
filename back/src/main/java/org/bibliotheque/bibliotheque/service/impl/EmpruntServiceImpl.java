package org.bibliotheque.bibliotheque.service.impl;


import lombok.RequiredArgsConstructor;
import org.bibliotheque.bibliotheque.modele.DTO.req.EmpruntReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.EmpruntResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Emprunt;
import org.bibliotheque.bibliotheque.modele.mapper.EmpruntMapper;
import org.bibliotheque.bibliotheque.repository.EmpruntRepo;
import org.bibliotheque.bibliotheque.service.intrf.EmpruntService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class EmpruntServiceImpl implements EmpruntService{
        //, UserDetailsService {

    //private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    private final EmpruntMapper mapper;

    private final EmpruntRepo repository;


    @Override
    public EmpruntResDTO save(EmpruntReqDTO req) {
        Emprunt emp = mapper.toEntity(req);
        //emp.setPassword(this.passwordEncoder.encode(emp.getPassword()));
        repository.save(emp);
        return mapper.toRespDTO(emp);  
    }

    @Override
    public EmpruntResDTO update(EmpruntReqDTO req) {
        Emprunt updated = mapper.toEntity(req);
        Optional<Emprunt> existingEmpruntOptional = this.repository.findEmpruntByIdEmprunt(updated.getIdEmprunt());

        if (existingEmpruntOptional.isPresent()) {
            Emprunt existingEmprunt = existingEmpruntOptional.get();

            existingEmprunt.setDateEmprunt(updated.getDateEmprunt());
            existingEmprunt.setUpdatedAt(LocalDateTime.now());
            existingEmprunt.setDeletedAt(null);
            Emprunt savedEmprunt = repository.save(existingEmprunt);
            return mapper.toRespDTO(savedEmprunt);
        }
        return null;
    }

    @Override
    public List<EmpruntResDTO> findAll() {
            List<Emprunt> users = this.repository.findAll();
            return mapper.toAllRespDTO(users);
        }

    @Override
    public Optional<EmpruntResDTO> findById(int id) {
            Optional<Emprunt> optionalAdmin = this.repository.findById(id);
            if (optionalAdmin.isPresent()) {
                EmpruntResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
                return Optional.of(AdminResDTO);
            } else {
                return Optional.empty();
            }    
    }

    @Override
    public List<EmpruntResDTO> findByDateEmprunt(Date date) {
        List<Emprunt> users = this.repository.findEmpruntByDateEmprunt(date);
        return mapper.toAllRespDTO(users);   
    }

    @Override
    public List<EmpruntResDTO> findByDateRetour(Date dateEmprunt) {
        List<Emprunt> users = this.repository.findEmpruntByDateRetour(dateEmprunt);
        return mapper.toAllRespDTO(users);
    }

    @Override
    public List<EmpruntResDTO> findByLivreId(Integer idLivre) {
        List<Emprunt> users = this.repository.findEmpruntByLivreId(idLivre);
        return mapper.toAllRespDTO(users);
    }

    @Override
    public List<EmpruntResDTO> findByMemberId(Integer idEmprunt) {
        List<Emprunt> users = this.repository.findEmpruntByMemberId(idEmprunt);
        return mapper.toAllRespDTO(users);   
    }

    @Override
    public List<EmpruntResDTO> findByMemberIdAndLivreId(Integer idMember, Integer idLivre) {
        List<Emprunt> users = this.repository.findEmpruntByMemberIdAndLivreId(idMember,idLivre);
        return mapper.toAllRespDTO(users);  
    }


    @Override
    public void delete(EmpruntReqDTO req) {
            Emprunt emp = this.repository.findById(req.getIdEmprunt()).get();
            emp.setDeletedAt(LocalDateTime.now());
            repository.save(emp);
    }

    @Override
    public void deleteById(int id) {
            Emprunt emp = this.repository.findById(id).get();
            emp.setDeletedAt(LocalDateTime.now());
            repository.save(emp);
    }
}