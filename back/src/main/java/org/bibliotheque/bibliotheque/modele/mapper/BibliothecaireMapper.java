package org.bibliotheque.bibliotheque.modele.mapper;

import org.bibliotheque.bibliotheque.modele.DTO.req.BibliothecaireReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.BibliothecaireResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Bibliothecaire;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BibliothecaireMapper {

    Bibliothecaire toEntity(BibliothecaireReqDTO dto);

    BibliothecaireResDTO toRespDTO(Bibliothecaire resp);

    List<Bibliothecaire> toAllEntity(List<BibliothecaireReqDTO> dto);

    List<BibliothecaireResDTO> toAllRespDTO(List<Bibliothecaire> resp);
}
