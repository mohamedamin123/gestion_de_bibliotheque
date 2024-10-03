package org.bibliotheque.bibliotheque.securite;


import org.bibliotheque.bibliotheque.modele.entity.Auther;
import org.bibliotheque.bibliotheque.modele.entity.Bibliothecaire;
import org.bibliotheque.bibliotheque.modele.entity.Member;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class UtulisateurDetail implements UserDetails {

    private final Auther auther;
    private final Bibliothecaire bibliothecaire;

    private final Member member;

    // Constructeur pour Auther
    public UtulisateurDetail(Auther Auther) {
        this.auther = Auther;
        this.bibliothecaire = null;
        this.member=null;
    }

    // Constructeur pour Bibliothecaire
    public UtulisateurDetail(Bibliothecaire Bibliothecaire) {
        this.bibliothecaire = Bibliothecaire;
        this.auther = null;
        this.member=null;
    }

    public UtulisateurDetail(Member Member) {
        this.bibliothecaire = null;
        this.auther = null;
        this.member=Member;
    }

    private String getRole() {
        if (auther != null) {
            return auther.getRole();
        } else if (bibliothecaire != null) {
            return bibliothecaire.getRole();
        }
        else if (member != null) {
            return member.getRole();
        }
        return null;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        String roleEnum = getRole();
        if (roleEnum != null) {
            String role = "ROLE_" + roleEnum;
            GrantedAuthority authority = new SimpleGrantedAuthority(role);
            authorities.add(authority);
        }
        return authorities;
    }

    @Override
    public String getPassword() {
        if (auther != null) {
            return auther.getPassword();
        } else if (bibliothecaire != null) {
            return bibliothecaire.getPassword();
        } else if (member != null) {
            return member.getPassword();
        }
        return null;
    }

    @Override
    public String getUsername() {
        if (auther != null) {
            return auther.getEmail();
        } else if (bibliothecaire != null) {
            return bibliothecaire.getEmail();
        }
        else if (member != null) {
            return member.getEmail();
        }
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
