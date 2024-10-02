package org.bibliotheque.bibliotheque.modele.mapper;

import org.bibliotheque.bibliotheque.modele.DTO.req.EmpruntReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.EmpruntResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Emprunt;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface EmpruntMapper {

    Emprunt toEntity(EmpruntReqDTO dto);

    EmpruntResDTO toRespDTO(Emprunt resp);

    List<Emprunt> toAllEntity(List<EmpruntReqDTO> dto);

    List<EmpruntResDTO> toAllRespDTO(List<Emprunt> resp);
}
