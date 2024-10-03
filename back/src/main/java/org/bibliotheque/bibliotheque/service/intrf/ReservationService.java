package org.bibliotheque.bibliotheque.service.intrf;


import jakarta.validation.constraints.NotNull;
import org.bibliotheque.bibliotheque.modele.DTO.req.ReservationReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.ReservationResDTO;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service

public interface ReservationService {
    ReservationResDTO save(ReservationReqDTO req);

    ReservationResDTO update(ReservationReqDTO req);

    List<ReservationResDTO> findAll();

     Optional<ReservationResDTO> findById(int id) ;

    List<ReservationResDTO> findByDateReservation(Date date);
    
    List<ReservationResDTO> findByLivreId (Integer idLivre);
    List<ReservationResDTO> findByMemberId (Integer idEmprunt);

    List<ReservationResDTO> findByMemberIdAndLivreId (Integer idEmprunt,Integer idLivre);



    void delete(ReservationReqDTO req);

    void deleteById(int id);








}