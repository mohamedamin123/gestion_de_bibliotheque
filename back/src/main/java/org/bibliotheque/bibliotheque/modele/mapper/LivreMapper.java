package org.bibliotheque.bibliotheque.modele.mapper;

import org.bibliotheque.bibliotheque.modele.DTO.req.LivreReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.LivreResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Livre;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface LivreMapper {

    Livre toEntity(LivreReqDTO dto);

    LivreResDTO toRespDTO(Livre resp);

    List<Livre> toAllEntity(List<LivreReqDTO> dto);

    List<LivreResDTO> toAllRespDTO(List<Livre> resp);
}
