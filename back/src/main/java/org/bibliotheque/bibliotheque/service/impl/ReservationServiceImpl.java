package org.bibliotheque.bibliotheque.service.impl;


import lombok.RequiredArgsConstructor;
import org.bibliotheque.bibliotheque.modele.DTO.req.ReservationReqDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.EmpruntResDTO;
import org.bibliotheque.bibliotheque.modele.DTO.res.ReservationResDTO;
import org.bibliotheque.bibliotheque.modele.entity.Emprunt;
import org.bibliotheque.bibliotheque.modele.entity.Reservation;
import org.bibliotheque.bibliotheque.modele.mapper.ReservationMapper;
import org.bibliotheque.bibliotheque.repository.ReservationRepo;
import org.bibliotheque.bibliotheque.service.intrf.ReservationService;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Primary
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService{
        //, UserDetailsService {

    //private PasswordEncoder passwordEncoder=new BCryptPasswordEncoder();

    private final ReservationMapper mapper;

    private final ReservationRepo repository;

    private final EmpruntServiceImpl empruntService;


    @Override
    public ReservationResDTO save(ReservationReqDTO req) {

        Date dateReservation;
        Calendar cal = Calendar.getInstance();
        List<ReservationResDTO> reservations=this.findByLivreId(req.getLivreId());
        if(!reservations.isEmpty()){
            ReservationResDTO dernierReservation= reservations.get(reservations.size() - 1);
            cal.setTime(dernierReservation.getDateReservation());
            cal.add(Calendar.DAY_OF_YEAR, 22);
            dateReservation = cal.getTime();
            req.setDateReservation(dateReservation);

        }else {
            List<EmpruntResDTO> emprunt=empruntService.findByLivreId(req.getLivreId());
            if(!emprunt.isEmpty()) {
                EmpruntResDTO dernierEmprunt = emprunt.get(emprunt.size() - 1);
                cal.setTime(dernierEmprunt.getDateRetour());
                cal.add(Calendar.DAY_OF_YEAR, 1);
                dateReservation = cal.getTime();
                req.setDateReservation(dateReservation);
            }
        }
        Reservation emp = mapper.toEntity(req);
        System.out.println(emp);
        repository.save(emp);
        return mapper.toRespDTO(emp);  
    }

    @Override
    public ReservationResDTO update(ReservationReqDTO req) {
        Reservation updated = mapper.toEntity(req);
        Optional<Reservation> existingReservationOptional = this.repository.findReservationByIdReservation(updated.getIdReservation());

        if (existingReservationOptional.isPresent()) {
            Reservation existingReservation = existingReservationOptional.get();

            existingReservation.setDateReservation(updated.getDateReservation());
            existingReservation.setUpdatedAt(LocalDateTime.now());
            existingReservation.setDeletedAt(null);
            Reservation savedReservation = repository.save(existingReservation);
            return mapper.toRespDTO(savedReservation);
        }
        return null;
    }

    @Override
    public List<ReservationResDTO> findAll() {
            List<Reservation> users = this.repository.findAll();
            return mapper.toAllRespDTO(users);
        }

    @Override
    public Optional<ReservationResDTO> findById(int id) {
            Optional<Reservation> optionalAdmin = this.repository.findById(id);
            if (optionalAdmin.isPresent()) {
                ReservationResDTO AdminResDTO = mapper.toRespDTO(optionalAdmin.get());
                return Optional.of(AdminResDTO);
            } else {
                return Optional.empty();
            }
    }

    @Override
    public List<ReservationResDTO> findByDateReservation(Date date) {
        List<Reservation> users = this.repository.findReservationByDateReservation(date);
        return mapper.toAllRespDTO(users);
    }

    @Override
    public List<ReservationResDTO> findByLivreId(Integer idLivre) {
        List<Reservation> users = this.repository.findReservationByLivreId(idLivre);
        List<Reservation> filteredUsers = users.stream()
                .filter(Objects::nonNull) // Ensure the Emprunt object itself is not null
                .filter(user -> user.getDeletedAt() == null) // Filter out where 'statut' is null
                .collect(Collectors.toList());
        return mapper.toAllRespDTO(filteredUsers);
    }

    @Override
    public List<ReservationResDTO> findByMemberId(Integer idEmprunt) {
        List<Reservation> users = this.repository.findReservationByMemberId(idEmprunt);
        List<Reservation> filteredUsers = users.stream()
                .filter(Objects::nonNull) // Ensure the Emprunt object itself is not null
                .filter(user -> user.getDeletedAt() == null) // Filter out where 'statut' is null
                .collect(Collectors.toList());
        return mapper.toAllRespDTO(filteredUsers);    }

    @Override
    public List<ReservationResDTO> findByMemberIdAndLivreId(Integer idMember, Integer idLivre) {
        List<Reservation> users = this.repository.findReservationByMemberIdAndLivreId(idMember,idLivre);
        return mapper.toAllRespDTO(users);
    }


    @Override
    public void delete(ReservationReqDTO req) {
            Reservation emp = this.repository.findById(req.getIdReservation()).get();
//            emp.setDeletedAt(LocalDateTime.now());
//            repository.save(emp);
        repository.delete(emp);
    }

    @Override
    public void deleteById(int id) {
            Reservation emp = this.repository.findById(id).get();
//            emp.setDeletedAt(LocalDateTime.now());
//            repository.save(emp);
        repository.deleteById(id);
    }
}