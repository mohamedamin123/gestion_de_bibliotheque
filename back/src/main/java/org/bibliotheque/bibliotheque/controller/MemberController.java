package org.bibliotheque.bibliotheque.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bibliotheque.bibliotheque.modele.DTO.req.MemberReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.MemberResDTO;
import org.bibliotheque.bibliotheque.service.intrf.MemberService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/members/member")
@RequiredArgsConstructor
@Slf4j
public class MemberController {

    private final MemberService service;

//------------------------------------------------------------------------------------------------------------------find
    @GetMapping(path = "/find-all")
    public List<MemberResDTO> findAllMember()
    {
        return this.service.findAll();
    }

    @GetMapping(path = "find-by-id/{id}")
    public Optional<MemberResDTO> findMemberById(@PathVariable(name = "id")  Integer id)
    {

        return this.service.findById(id);
    }

    @GetMapping(path = "/find-by-email/{email}")
    public Optional<MemberResDTO> findMemberByEmail(@PathVariable(name = "email")  String email)
    {
        return this.service.findByEmail(email);
    }

    @GetMapping(path = "/find-by-email/{tel}")
    public Optional<MemberResDTO> findMemberByTel(@PathVariable(name = "tel")  List<String> tel)
    {
        return this.service.findByTel(tel);
    }


//------------------------------------------------------------------------------------------------------------------save

    @PostMapping(path = "/save")
    public void saveMember(@RequestBody MemberReqDTO user)
    {
        this.service.save(user);
    }

    @PutMapping(path = "/update")
    public void updateMember(@RequestBody MemberReqDTO user)
    {
        this.service.update(user);
    }

//----------------------------------------------------------------------------------------------------------------delete

    @DeleteMapping(path = "/delete-by-id/{id}")
    public void deleteMemberById(@PathVariable(name = "id")  Integer id)
    {
        this.service.deleteById(id);
    }

    @DeleteMapping(path = "/delete")
    public void deleteMember(@RequestBody MemberReqDTO user)
    {
        this.service.delete(user);
    }
}
