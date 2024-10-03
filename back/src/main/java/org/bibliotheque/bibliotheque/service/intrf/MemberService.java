package org.bibliotheque.bibliotheque.service.intrf;


import org.bibliotheque.bibliotheque.modele.DTO.req.MemberReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AutherResDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.MemberResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Member;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public interface MemberService {
    MemberResDTO save(MemberReqDTO req);

    MemberResDTO update(MemberReqDTO req);

    List<MemberResDTO> findAll();

     Optional<MemberResDTO> findById(int id) ;

    Optional<MemberResDTO> findByEmail(String email);

    Optional<MemberResDTO> findByTel(List<String> email);

    List<MemberResDTO> findByPrenomOrNom(String prenom, String nom);


    void delete(MemberReqDTO req);

    void deleteById(int id);








}