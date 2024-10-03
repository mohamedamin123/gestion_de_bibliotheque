package org.bibliotheque.bibliotheque.service.intrf;


import jakarta.validation.constraints.NotNull;
import org.bibliotheque.bibliotheque.modele.DTO.req.EmpruntReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.EmpruntResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Emprunt;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service

public interface EmpruntService {
    EmpruntResDTO save(EmpruntReqDTO req);

    EmpruntResDTO update(EmpruntReqDTO req);

    List<EmpruntResDTO> findAll();

     Optional<EmpruntResDTO> findById(int id) ;

    List<EmpruntResDTO> findByDateEmprunt(@NotNull(message = "La date d'emprunt ne doit pas être vide") Date dateEmprunt);

    List<EmpruntResDTO> findByDateRetour(@NotNull(message = "La date de retour ne doit pas être vide") Date dateEmprunt);

    List<EmpruntResDTO> findByLivreId (Integer idLivre);
    List<EmpruntResDTO> findByMemberId (Integer idEmprunt);

    List<EmpruntResDTO> findByMemberIdAndLivreId (Integer idEmprunt,Integer idLivre);



    void delete(EmpruntReqDTO req);

    void deleteById(int id);








}