package org.bibliotheque.bibliotheque.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bibliotheque.bibliotheque.modele.DTO.req.AdminReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.AdminResDTO;
import org.bibliotheque.bibliotheque.service.intrf.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/admins/admin")
@RequiredArgsConstructor
@Slf4j

public class AdminController {

    private final AdminService service;

//------------------------------------------------------------------------------------------------------------------find
    @GetMapping(path = "/find-all")
    public List<AdminResDTO> findAllAdmin()
    {
        return this.service.findAll();
    }

    @GetMapping(path = "find-by-id/{id}")
    public Optional<AdminResDTO> findAdminById(@PathVariable(name = "id")  Integer id)
    {

        return this.service.findById(id);
    }

    @GetMapping(path = "/find-by-email/{email}")
    public Optional<AdminResDTO> findAdminByEmail(@PathVariable(name = "email")  String email)
    {
        return this.service.findByEmail(email);
    }


    
//------------------------------------------------------------------------------------------------------------------save

    @PostMapping(path = "/save")
    public AdminResDTO saveAdmin(@RequestBody AdminReqDTO user)
    {
       return this.service.save(user);
    }

    @PutMapping(path = "/update")
    public AdminResDTO updateAdmin(@RequestBody AdminReqDTO user)
    {
        return this.service.update(user);
    }

//----------------------------------------------------------------------------------------------------------------delete

    @DeleteMapping(path = "/delete-by-id/{id}")
    public void deleteAdminById(@PathVariable(name = "id")  Integer id)
    {
        this.service.deleteById(id);
    }

    @DeleteMapping(path = "/delete")
    public void deleteAdmin(@RequestBody AdminReqDTO user)
    {
        this.service.delete(user);
    }
}
