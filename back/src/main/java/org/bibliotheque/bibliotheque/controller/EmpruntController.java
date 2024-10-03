package org.bibliotheque.bibliotheque.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bibliotheque.bibliotheque.modele.DTO.req.EmpruntReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.EmpruntResDTO;
import org.bibliotheque.bibliotheque.service.intrf.EmpruntService;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/emprunts/emprunt")
@RequiredArgsConstructor
@Slf4j
public class EmpruntController {

    private final EmpruntService service;

//------------------------------------------------------------------------------------------------------------------find
    @GetMapping(path = "/find-all")
    public List<EmpruntResDTO> findAllEmprunt()
    {
        return this.service.findAll();
    }

    @GetMapping(path = "find-by-id/{id}")
    public Optional<EmpruntResDTO> findEmpruntById(@PathVariable(name = "id")  Integer id)
    {
        return this.service.findById(id);
    }

    @GetMapping(path = "/find-by-date-Emprunt/{date}")
    public List<EmpruntResDTO> findByDateEmprunt(@PathVariable(name = "date") Date date)
    {
        return this.service.findByDateEmprunt(date);
    }

    @GetMapping(path = "/find-by-date-retour/{date}")
    public List<EmpruntResDTO> findByDateRetour(@PathVariable(name = "date") Date date)
    {
        return this.service.findByDateRetour(date);
    }

    @GetMapping(path = "find-by-livre-id/{id}")
    public List<EmpruntResDTO> findByLivreId(@PathVariable(name = "id")  Integer id)
    {
        return this.service.findByLivreId(id);
    }

    @GetMapping(path = "find-by-member-id/{id}")
    public List<EmpruntResDTO> findByMemberId(@PathVariable(name = "id")  Integer id)
    {
        return this.service.findByMemberId(id);
    }

    @GetMapping(path = "find-by-member-id-and-livre-id/{idM}/{idL}")
    public List<EmpruntResDTO> findByMemberIdAndLivreId(@PathVariable(name = "idM") Integer idM,
                                                            @PathVariable(name = "idL") Integer idL) {
        return this.service.findByMemberIdAndLivreId(idM, idL);
    }





//------------------------------------------------------------------------------------------------------------------save

    @PostMapping(path = "/save")
    public void saveEmprunt(@RequestBody EmpruntReqDTO user)
    {
        this.service.save(user);
    }

    @PutMapping(path = "/update")
    public void updateEmprunt(@RequestBody EmpruntReqDTO user)
    {
        this.service.update(user);
    }

//----------------------------------------------------------------------------------------------------------------delete

    @DeleteMapping(path = "/delete-by-id/{id}")
    public void deleteEmpruntById(@PathVariable(name = "id")  Integer id)
    {
        this.service.deleteById(id);
    }

    @DeleteMapping(path = "/delete")
    public void deleteEmprunt(@RequestBody EmpruntReqDTO user)
    {
        this.service.delete(user);
    }
}
