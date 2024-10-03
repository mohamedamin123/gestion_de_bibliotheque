package org.bibliotheque.bibliotheque.util.sendEmail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Random;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Email {

    private Integer id;
    private String to;
    private String subject = "Confirm your email";
    private String body;
    private String code;

    //------------------------------------------------------------------------------------------------------------foreignKey
    public Email(String to) {
        this.to = to;
        this.code = generateCode();  // Generate the code
        this.body = creationCompte(this.code);  // Create the email body with the generated code
    }

    public Email(String to, String subject, String body) {
        this.to = to;
        this.subject = subject;
        this.body = body;
    }

    // Generate the body of the email with the confirmation code
    public String creationCompte(String code) {
        return
                "Cher utilisateur,\n Merci de vous être inscrit sur notre plateforme. Afin de valider votre compte et vous permettre de profiter de tous nos services, nous vous demandons de confirmer votre adresse e-mail en utilisant le code de confirmation suivant :\n" +
                "\n" +
                code;
    }

    // Method to generate a 6-digit random code
    private String generateCode() {
        Random random = new Random();
        int code = random.nextInt(899999) + 100000;  // Generate a random number between 100000 and 999999
        return String.valueOf(code);
    }
}
