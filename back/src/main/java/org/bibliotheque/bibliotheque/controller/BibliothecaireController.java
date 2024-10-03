package org.bibliotheque.bibliotheque.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bibliotheque.bibliotheque.modele.DTO.req.BibliothecaireReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.BibliothecaireResDTO;
import org.bibliotheque.bibliotheque.service.intrf.BibliothecaireService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/bibliothecaires/bibliothecaire")
@RequiredArgsConstructor
@Slf4j
public class BibliothecaireController {

    private final BibliothecaireService service;

//------------------------------------------------------------------------------------------------------------------find
    @GetMapping(path = "/find-all")
    public List<BibliothecaireResDTO> findAllBibliothecaire()
    {
        return this.service.findAll();
    }

    @GetMapping(path = "find-by-id/{id}")
    public Optional<BibliothecaireResDTO> findBibliothecaireById(@PathVariable(name = "id")  Integer id)
    {

        return this.service.findById(id);
    }

    @GetMapping(path = "/find-by-email/{email}")
    public Optional<BibliothecaireResDTO> findBibliothecaireByEmail(@PathVariable(name = "email")  String email)
    {
        return this.service.findByEmail(email);
    }

    @GetMapping(path = "/find-by-email/{tel}")
    public Optional<BibliothecaireResDTO> findBibliothecaireByTel(@PathVariable(name = "tel")  List<String> tel)
    {
        return this.service.findByTel(tel);
    }


//------------------------------------------------------------------------------------------------------------------save

    @PostMapping(path = "/save")
    public void saveBibliothecaire(@RequestBody BibliothecaireReqDTO user)
    {
        this.service.save(user);
    }

    @PutMapping(path = "/update")
    public void updateBibliothecaire(@RequestBody BibliothecaireReqDTO user)
    {
        this.service.update(user);
    }

//----------------------------------------------------------------------------------------------------------------delete

    @DeleteMapping(path = "/delete-by-id/{id}")
    public void deleteBibliothecaireById(@PathVariable(name = "id")  Integer id)
    {
        this.service.deleteById(id);
    }

    @DeleteMapping(path = "/delete")
    public void deleteBibliothecaire(@RequestBody BibliothecaireReqDTO user)
    {
        this.service.delete(user);
    }
}
