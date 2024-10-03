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




//------------------------------------------------------------------------------------------------------------------save

    @PostMapping(path = "/save")
    public void saveLivre(@RequestBody LivreReqDTO user)
    {
        this.service.save(user);
    }

    @PutMapping(path = "/update")
    public void updateLivre(@RequestBody LivreReqDTO user)
    {
        this.service.update(user);
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
