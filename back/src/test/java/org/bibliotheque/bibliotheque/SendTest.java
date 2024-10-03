package org.bibliotheque.bibliotheque;

import org.bibliotheque.bibliotheque.util.sendEmail.Email;
import org.bibliotheque.bibliotheque.util.sendEmail.SendEmailService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class SendTest {

    @Autowired
    private SendEmailService service;


    @Test
    void sendEmail() {



    }
}
