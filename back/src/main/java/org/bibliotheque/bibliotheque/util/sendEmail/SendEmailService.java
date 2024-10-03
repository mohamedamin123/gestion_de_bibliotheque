package org.bibliotheque.bibliotheque.util.sendEmail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;


@Service
public class SendEmailService {

//------------------------------------------------------------------------------------------------------------attributes
    @Autowired
    private JavaMailSender mailSender;
//-----------------------------------------------------------------------------------------------------------------email
    public String sendEmail(Email email)
    {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = null;
        try {
            helper = new MimeMessageHelper(message, true);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
        try {
            helper.setFrom("mohamedaming146@gmail.com");
            helper.setTo(email.getTo());
            helper.setSubject(email.getSubject());
            helper.setText(email.getBody(), true);
            mailSender.send(message);
            System.out.println("Email sent successfully");
            return email.getCode();
        } catch (MessagingException e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
        return null;
    }
}
