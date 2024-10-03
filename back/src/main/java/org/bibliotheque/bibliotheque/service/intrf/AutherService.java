package org.bibliotheque.bibliotheque.service.intrf;


import org.bibliotheque.bibliotheque.modele.DTO.req.AutherReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AutherResDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public interface AutherService {
    AutherResDTO save(AutherReqDTO req);

    AutherResDTO update(AutherReqDTO req);

    List<AutherResDTO> findAll();

     Optional<AutherResDTO> findById(int id) ;

    Optional<AutherResDTO> findByEmail(String email);

    Optional<AutherResDTO> findByTel(List<String> email);

    List<AutherResDTO> findByPrenomOrNom(String prenom, String nom);


    void delete(AutherReqDTO req);

    void deleteById(int id);








}