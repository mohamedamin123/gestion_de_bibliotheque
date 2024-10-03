package org.bibliotheque.bibliotheque.service.intrf;


import org.bibliotheque.bibliotheque.modele.DTO.req.BibliothecaireReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AutherResDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.BibliothecaireResDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public interface BibliothecaireService {
    BibliothecaireResDTO save(BibliothecaireReqDTO req);

    BibliothecaireResDTO update(BibliothecaireReqDTO req);

    List<BibliothecaireResDTO> findAll();

     Optional<BibliothecaireResDTO> findById(int id) ;

    Optional<BibliothecaireResDTO> findByEmail(String email);

    Optional<BibliothecaireResDTO> findByTel(List<String> email);

    List<BibliothecaireResDTO> findByPrenomOrNom(String prenom, String nom);


    void delete(BibliothecaireReqDTO req);

    void deleteById(int id);








}