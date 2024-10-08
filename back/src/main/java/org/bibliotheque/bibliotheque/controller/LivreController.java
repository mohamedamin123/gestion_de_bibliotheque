package org.bibliotheque.bibliotheque.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bibliotheque.bibliotheque.modele.DTO.req.LivreReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.LivreResDTO;
import org.bibliotheque.bibliotheque.service.intrf.LivreService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/livres/livre")
@RequiredArgsConstructor
@Slf4j

public class LivreController {

    private final LivreService service;

//------------------------------------------------------------------------------------------------------------------find
    @GetMapping(path = "/find-all")
    public List<LivreResDTO> findAllLivre()
    {
        return this.service.findAll();
    }

    @GetMapping(path = "find-by-id/{id}")
    public Optional<LivreResDTO> findLivreById(@PathVariable(name = "id")  Integer id)
    {

        return this.service.findById(id);
    }

    @GetMapping(path = "/find-by-titre/{titre}")
    public List<LivreResDTO> findLivreByEmail(@PathVariable(name = "titre")  String titre)
    {
        return this.service.findByTitre(titre);
    }


    @GetMapping(path = "/find-by-id-auther/{id}")
    public List<LivreResDTO> findLivreByEmail(@PathVariable(name = "id")  int id)
    {
        return this.service.findLivreByIdAuther(id);
    }

    @GetMapping(path = "/find-by-statut/{statut}")
    public List<LivreResDTO> findLivreByStatut(@PathVariable(name = "statut")  boolean statut)
    {
        return this.service.findLivreByStatut(statut);
    }

//------------------------------------------------------------------------------------------------------------------save

    @PostMapping(path = "/save")
    public LivreResDTO saveLivre(@RequestBody LivreReqDTO user)
    {
       return this.service.save(user);
    }

    @PutMapping(path = "/update")
    public LivreResDTO updateLivre(@RequestBody LivreReqDTO user)
    {
        return this.service.update(user);
    }

//----------------------------------------------------------------------------------------------------------------delete

    @DeleteMapping(path = "/delete-by-id/{id}")
    public void deleteLivreById(@PathVariable(name = "id")  Integer id)
    {
        this.service.deleteById(id);
    }

    @DeleteMapping(path = "/delete")
    public void deleteLivre(@RequestBody LivreReqDTO user)
    {
        this.service.delete(user);
    }
}
