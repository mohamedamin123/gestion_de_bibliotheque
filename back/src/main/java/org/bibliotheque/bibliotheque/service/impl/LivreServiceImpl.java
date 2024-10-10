package org.bibliotheque.bibliotheque.service.impl;


import lombok.RequiredArgsConstructor;
import org.bibliotheque.bibliotheque.modele.DTO.req.LivreReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.LivreResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Livre;
import org.bibliotheque.bibliotheque.modele.mapper.LivreMapper;
import org.bibliotheque.bibliotheque.repository.LivreRepo;
import org.bibliotheque.bibliotheque.service.intrf.LivreService;
import org.bibliotheque.bibliotheque.util.enumm.Etat;
import org.bibliotheque.bibliotheque.util.enumm.Type;
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
        req.setEtat(Etat.DISPONIBLE);
        Livre emp = mapper.toEntity(req);
        repository.save(emp);
        return mapper.toRespDTO(emp);
    }

    @Override
    public LivreResDTO update(LivreReqDTO req) {
        System.out.println("id "+req.getEtat());

        Livre updated = mapper.toEntity(req);
        Optional<Livre> existingLivreOptional = this.repository.findLivreByIdLivre(updated.getIdLivre());
        if (existingLivreOptional.isPresent()) {

            Livre existingLivre = existingLivreOptional.get();
            existingLivre.setTitre(updated.getTitre());
            existingLivre.setDescription(updated.getDescription());
            existingLivre.setNbrPage(updated.getNbrPage());
            existingLivre.setImage(updated.getImage());
            existingLivre.setStar(updated.getStar());
            existingLivre.setStatut(updated.getStatut());
            existingLivre.setUpdatedAt(LocalDateTime.now());
            existingLivre.setDeletedAt(null);
            existingLivre.setEtat(updated.getEtat());

            System.out.println(existingLivre);
            Livre savedLivre = repository.save(existingLivre);
            System.out.println(savedLivre);

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
            }
    }

    @Override
    public List<LivreResDTO> findLivreByIdAuther(int id) {
        List<Livre> users = this.repository.findLivreByIdAuther(id);
        return mapper.toAllRespDTO(users);
    }

    @Override
    public List<LivreResDTO> findLivreByStatut(boolean statut) {
        List<Livre> users = this.repository.findLivreByStatut(statut);
        return mapper.toAllRespDTO(users);
    }

    @Override
    public List<LivreResDTO> findLivreByStatutAndType(Boolean statut, Type type) {
        List<Livre> users = this.repository.findLivreByStatutAndType(statut,type);
        return mapper.toAllRespDTO(users);
    }

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