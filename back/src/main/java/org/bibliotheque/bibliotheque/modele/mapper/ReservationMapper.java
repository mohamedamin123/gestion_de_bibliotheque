package org.bibliotheque.bibliotheque.modele.mapper;

import org.bibliotheque.bibliotheque.modele.DTO.req.ReservationReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.ReservationResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Reservation;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ReservationMapper {

    Reservation toEntity(ReservationReqDTO dto);

    ReservationResDTO toRespDTO(Reservation resp);

    List<Reservation> toAllEntity(List<ReservationReqDTO> dto);

    List<ReservationResDTO> toAllRespDTO(List<Reservation> resp);
}
