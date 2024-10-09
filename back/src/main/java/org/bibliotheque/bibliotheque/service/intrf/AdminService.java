package org.bibliotheque.bibliotheque.service.intrf;


import org.bibliotheque.bibliotheque.modele.DTO.req.AdminReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AdminResDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AutherResDTO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public interface AdminService {
    AdminResDTO save(AdminReqDTO req);

    AdminResDTO update(AdminReqDTO req);

    List<AdminResDTO> findAll();

     Optional<AdminResDTO> findById(int id) ;

    Optional<AdminResDTO> findByEmail(String email);


    void delete(AdminReqDTO req);

    void deleteById(int id);
    boolean verifyPassword(String rawPassword, String encodedPassword) ;








}