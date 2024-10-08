package org.bibliotheque.bibliotheque.service.intrf;


import org.bibliotheque.bibliotheque.modele.DTO.req.LivreReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.LivreResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Livre;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public interface LivreService {
    LivreResDTO save(LivreReqDTO req);

    LivreResDTO update(LivreReqDTO req);

    List<LivreResDTO> findAll();

     Optional<LivreResDTO> findById(int id) ;
    List<LivreResDTO> findLivreByIdAuther(int id) ;

    List<LivreResDTO> findLivreByStatut(boolean statut);



    List<LivreResDTO> findByTitre(String email);




    void delete(LivreReqDTO req);

    void deleteById(int id);








}