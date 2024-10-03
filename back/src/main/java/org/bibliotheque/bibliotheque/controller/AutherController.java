package org.bibliotheque.bibliotheque.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bibliotheque.bibliotheque.modele.DTO.req.AutherReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AutherResDTO;
import org.bibliotheque.bibliotheque.service.intrf.AutherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/authers/auther")
@RequiredArgsConstructor
@Slf4j
public class AutherController {

    private final AutherService service;

//------------------------------------------------------------------------------------------------------------------find
    @GetMapping(path = "/find-all")
    public List<AutherResDTO> findAllAuther()
    {
        return this.service.findAll();
    }

    @GetMapping(path = "find-by-id/{id}")
    public Optional<AutherResDTO> findAutherById(@PathVariable(name = "id")  Integer id)
    {

        return this.service.findById(id);
    }

    @GetMapping(path = "/find-by-email/{email}")
    public Optional<AutherResDTO> findAutherByEmail(@PathVariable(name = "email")  String email)
    {
        return this.service.findByEmail(email);
    }

    @GetMapping(path = "/find-by-email/{tel}")
    public Optional<AutherResDTO> findAutherByTel(@PathVariable(name = "tel")  List<String> tel)
    {
        return this.service.findByTel(tel);
    }

    
//------------------------------------------------------------------------------------------------------------------save

    @PostMapping(path = "/save")
    public void saveAuther(@RequestBody AutherReqDTO user)
    {
        this.service.save(user);
    }

    @PutMapping(path = "/update")
    public void updateAuther(@RequestBody AutherReqDTO user)
    {
        this.service.update(user);
    }

//----------------------------------------------------------------------------------------------------------------delete

    @DeleteMapping(path = "/delete-by-id/{id}")
    public void deleteAutherById(@PathVariable(name = "id")  Integer id)
    {
        this.service.deleteById(id);
    }

    @DeleteMapping(path = "/delete")
    public void deleteAuther(@RequestBody AutherReqDTO user)
    {
        this.service.delete(user);
    }
}
