package org.bibliotheque.bibliotheque.securite;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginViewModel {

    private String email;
    private String password;
}
