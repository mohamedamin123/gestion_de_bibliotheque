package org.bibliotheque.bibliotheque.util.sendEmail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/util")
public class SendEmailController {
    //------------------------------------------------------------------------------------------------------------attributes
    @Autowired
    private SendEmailService service;
//--------------------------------------------------------------------------------------------------------------methodes

    @PostMapping(path = "/send-email")
    public String send(@RequestBody Email email)
    {
       return  this.service.sendEmail(email);
    }

}
