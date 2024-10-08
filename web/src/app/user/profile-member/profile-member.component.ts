import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Member } from '../../shared/models/member';
import { MemberService } from '../../shared/services/member.service';
import { LoginService } from '../../shared/services/login.service';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/models/user';
import { Auther } from '../../shared/models/auther';
import { AutherService } from '../../shared/services/auther.service';
import { Bibliothecaire } from '../../shared/models/bibliothecaire';
import { BibliothecaireService } from '../../shared/services/bibliothecaire.service';

@Component({
  selector: 'app-profile-member',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './profile-member.component.html',
  styleUrls: ['./profile-member.component.css']
})
export class ProfileMemberComponent implements OnInit {
  profileForm: FormGroup;
  memberinitial: User | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private memberService: MemberService,
    private autherService: AutherService,
    private bibliothecaireService: BibliothecaireService,

    private loginSerive: LoginService,

  ) {
    this.profileForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z]+$/)]],
      prenom: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z]+$/)]],
      telephone1: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      telephone2: ['', Validators.pattern(/^[0-9]{8}$/)], // Optional
      dateDeNaissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

    });
  }

  ngOnInit() {
    this.loadMemberData();
  }
  private loadMemberData() {
    // Load the member data from the service
    const memberinitial = this.loginSerive.getMember(); // Assuming it returns a Member object
    this.profileForm.patchValue({
      nom: memberinitial?.nom,
      prenom: memberinitial?.prenom,
      telephone1: memberinitial?.tel[0] || '', // Assuming tel is an array
      telephone2: memberinitial?.tel[1] || '', // Optional, handle if only one number exists
      dateDeNaissance: memberinitial?.dateDeNaissance,
      email: memberinitial?.email
    });
  }


  onSubmit() {
    if (this.profileForm.valid) {
      this.trimFormValues(); // Call the trim method before processing the form

      const updatedMember: Member = { ...this.profileForm.value };
      const saveAuther: Auther = { ...this.profileForm.value };
      const saveBibliothecaire: Bibliothecaire = { ...this.profileForm.value };


      saveAuther.statut=true;
      updatedMember.statut=true;
      saveBibliothecaire.statut=true;




      // Collect the phone numbers into an array
      updatedMember.tel = [];
      saveAuther.tel = [];
      saveBibliothecaire.tel=[];

      if((this.loginSerive.getMember()?.role)=="MEMBER") {
        if (updatedMember['telephone1']) {
          updatedMember.tel.push(updatedMember['telephone1']);
        }
        if (updatedMember['telephone2']) {
          updatedMember.tel.push(updatedMember['telephone2']);
        }
      } else if((this.loginSerive.getMember()?.role)=="AUTHER") {
          saveAuther.tel.push(updatedMember['telephone1']);
          if(updatedMember['telephone2'])
          saveAuther.tel.push(updatedMember['telephone2']);

        saveAuther.nationalite=this.loginSerive.getMember().nationalite;
      } else if((this.loginSerive.getMember()?.role)=="BIBLIOTHECAIRE") {

        saveBibliothecaire.tel.push(updatedMember['telephone1']);
        if(updatedMember['telephone2'])
          saveBibliothecaire.tel.push(updatedMember['telephone2']);
        saveBibliothecaire.matricule=this.loginSerive.getMember().matricule;
      }


      if((this.loginSerive.getMember()?.role)=="MEMBER"){
        this.memberService.updateMember(updatedMember).subscribe(
          response => {
            console.log('Profile updated successfully', response);
            this.router.navigate(["home-member"])
            this.loginSerive.setMember(response);
            // Redirect or show a success message
          },
          error => {
            console.error('Error updating profile', error);
            // Handle the error case
          }
        );
      } else if(this.loginSerive.getMember()?.role=="AUTHER") {

        this.autherService.updateAuther(saveAuther).subscribe(
          response => {
            console.log('Profile updated successfully', response);
            this.router.navigate(["home-auther"])
            this.loginSerive.setMember(response);

            // Redirect or show a success message
          },
          error => {
            console.error('Error updating profile', error);
            // Handle the error case
          }
        );
      } else if((this.loginSerive.getMember()?.role)=="BIBLIOTHECAIRE") {
        this.bibliothecaireService.updateBibliothecaire(saveBibliothecaire).subscribe(
          response => {
            console.log('Profile updated successfully', response);
            this.router.navigate(["home-bibliothecaire"])
            this.loginSerive.setMember(response);

            // Redirect or show a success message
          },
          error => {
            console.error('Error updating profile', error);
            // Handle the error case
          }
        );

      } else {
        this.router.navigate(["login"]);
      }

      // Call the service to update the member

    } else {
      console.log('Form is invalid', this.profileForm.errors);
    }
  }

  // Method to trim whitespace from form values
  private trimFormValues() {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      if (control && typeof control.value === 'string') {
        control.setValue(control.value.trim());
      }
    });
  }
  retour() {
    if(this.loginSerive.getMember()?.role=="MEMBER") {
      this.router.navigate(["home-member"])

    }else if(this.loginSerive.getMember()?.role=="AUTHER") {
      this.router.navigate(["home-auther"])

    } else if(this.loginSerive.getMember()?.role=="BIBLIOTHECAIRE") {
      this.router.navigate(["home-bibliothecaire"])

    }else {
      this.router.navigate(["login"]);

    }
  }
}
