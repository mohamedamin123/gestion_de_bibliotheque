package org.bibliotheque.bibliotheque.modele.mapper;

import org.bibliotheque.bibliotheque.modele.DTO.req.AutherReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AutherResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Auther;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AutherMapper {

    Auther toEntity(AutherReqDTO dto);

    AutherResDTO toRespDTO(Auther resp);

    List<Auther> toAllEntity(List<AutherReqDTO> dto);

    List<AutherResDTO> toAllRespDTO(List<Auther> resp);
}
