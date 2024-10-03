package org.bibliotheque.bibliotheque.service.impl;


import lombok.RequiredArgsConstructor;
import org.bibliotheque.bibliotheque.modele.DTO.req.LivreReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.LivreResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Livre;
import org.bibliotheque.bibliotheque.modele.mapper.LivreMapper;
import org.bibliotheque.bibliotheque.repository.LivreRepo;
import org.bibliotheque.bibliotheque.service.intrf.LivreService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Primary
@RequiredArgsConstructor
public class LivreServiceImpl implements LivreService{
        //, UserDetailsService {

    //private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    private final LivreMapper mapper;

    private final LivreRepo repository;


    @Override
    public LivreResDTO save(LivreReqDTO req) {
        Livre emp = mapper.toEntity(req);
        //emp.setPassword(this.passwordEncoder.encode(emp.getPassword()));
        repository.save(emp);
        return mapper.toRespDTO(emp);
    }

    @Override
    public LivreResDTO update(LivreReqDTO req) {
        Livre updated = mapper.toEntity(req);
        Optional<Livre> existingLivreOptional = this.repository.findLivreByIdLivre(updated.getIdLivre());

        if (existingLivreOptional.isPresent()) {
            Livre existingLivre = existingLivreOptional.get();

            existingLivre.setTitre(updated.getTitre());
            existingLivre.setNbrPage(updated.getNbrPage());
            existingLivre.setUpdatedAt(LocalDateTime.now());
            existingLivre.setDeletedAt(null);
            Livre savedLivre = repository.save(existingLivre);
            return mapper.toRespDTO(savedLivre);
        }
        return null;
    }

    @Override
    public List<LivreResDTO> findAll() {
            List<Livre> users = this.repository.findAll();
            return mapper.toAllRespDTO(users);
        }

    @Override
    public Optional<LivreResDTO> findById(int id) {
            Optional<Livre> optionalAdmin = this.repository.findById(id);
            if (optionalAdmin.isPresent()) {
                LivreResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
                return Optional.of(AdminResDTO);
            } else {
                return Optional.empty();
            }     }

    @Override
    public List<LivreResDTO> findByTitre(String titre) {
            List<Livre> liste = this.repository.findLivreByTitre(titre);
        return mapper.toAllRespDTO(liste);

    }

    @Override
    public void delete(LivreReqDTO req) {
            Livre emp = this.repository.findById(req.getIdLivre()).get();
            emp.setDeletedAt(LocalDateTime.now());
            repository.save(emp);
    }

    @Override
    public void deleteById(int id) {
            Livre emp = this.repository.findById(id).get();
            emp.setDeletedAt(LocalDateTime.now());
            repository.save(emp);
    }
}