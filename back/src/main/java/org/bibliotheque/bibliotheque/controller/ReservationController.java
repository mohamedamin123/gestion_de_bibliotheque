package org.bibliotheque.bibliotheque.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bibliotheque.bibliotheque.modele.DTO.req.ReservationReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.ReservationResDTO;
import org.bibliotheque.bibliotheque.service.intrf.ReservationService;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations/reservation")
@RequiredArgsConstructor
@Slf4j

public class ReservationController {

    private final ReservationService service;

//------------------------------------------------------------------------------------------------------------------find
    @GetMapping(path = "/find-all")
    public List<ReservationResDTO> findAllReservation()
    {
        return this.service.findAll();
    }

    @GetMapping(path = "find-by-id/{id}")
    public Optional<ReservationResDTO> findReservationById(@PathVariable(name = "id")  Integer id)
    {
        return this.service.findById(id);
    }

    @GetMapping(path = "/find-by-date-reservation/{date}")
    public List<ReservationResDTO> findByDateReservation(@PathVariable(name = "date") Date date)
    {
        return this.service.findByDateReservation(date);
    }

    @GetMapping(path = "find-by-livre-id/{id}")
    public List<ReservationResDTO> findByLivreId(@PathVariable(name = "id")  Integer id)
    {
        return this.service.findByLivreId(id);
    }

    @GetMapping(path = "find-by-member-id/{id}")
    public List<ReservationResDTO> findByMemberId(@PathVariable(name = "id")  Integer id)
    {
        return this.service.findByMemberId(id);
    }

    @GetMapping(path = "find-by-member-id-and-livre-id/{idM}/{idL}")
    public List<ReservationResDTO> findByMemberIdAndLivreId(@PathVariable(name = "idM") Integer idM,
                                                            @PathVariable(name = "idL") Integer idL) {
        return this.service.findByMemberIdAndLivreId(idM, idL);
    }





//------------------------------------------------------------------------------------------------------------------save

    @PostMapping(path = "/save")
    public void saveReservation(@RequestBody ReservationReqDTO user)
    {
        this.service.save(user);
    }

    @PutMapping(path = "/update")
    public void updateReservation(@RequestBody ReservationReqDTO user)
    {
        this.service.update(user);
    }

//----------------------------------------------------------------------------------------------------------------delete

    @DeleteMapping(path = "/delete-by-id/{id}")
    public void deleteReservationById(@PathVariable(name = "id")  Integer id)
    {
        this.service.deleteById(id);
    }

    @DeleteMapping(path = "/delete")
    public void deleteReservation(@RequestBody ReservationReqDTO user)
    {
        this.service.delete(user);
    }
}
