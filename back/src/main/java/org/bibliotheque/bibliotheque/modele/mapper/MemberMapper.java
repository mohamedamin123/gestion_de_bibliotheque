package org.bibliotheque.bibliotheque.modele.mapper;

import org.bibliotheque.bibliotheque.modele.DTO.req.MemberReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.MemberResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Member;
import org.bibliotheque.bibliotheque.modele.entity.User;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member toEntity(MemberReqDTO dto);

    MemberResDTO toRespDTO(Member resp);

    List<Member> toAllEntity(List<MemberReqDTO> dto);

    List<MemberResDTO> toAllRespDTO(List<Member> resp);
}
