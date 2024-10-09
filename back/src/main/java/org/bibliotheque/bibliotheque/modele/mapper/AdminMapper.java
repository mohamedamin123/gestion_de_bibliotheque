package org.bibliotheque.bibliotheque.modele.mapper;

import org.bibliotheque.bibliotheque.modele.DTO.req.AdminReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AdminResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Admin;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AdminMapper {

    Admin toEntity(AdminReqDTO dto);

    AdminResDTO toRespDTO(Admin resp);

    List<Admin> toAllEntity(List<AdminReqDTO> dto);

    List<AdminResDTO> toAllRespDTO(List<Admin> resp);
}
