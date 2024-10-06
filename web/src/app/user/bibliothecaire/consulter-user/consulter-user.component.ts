import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Member } from '../../../shared/models/member';
import { User } from '../../../shared/models/user';
import { LoginService } from '../../../shared/services/login.service';
import { MemberService } from '../../../shared/services/member.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet,Router } from '@angular/router';
import { BibliothecaireService } from '../../../shared/services/bibliothecaire.service';
import { AutherService } from '../../../shared/services/auther.service';
import { Auther } from '../../../shared/models/auther';

@Component({
  selector: 'app-consulter-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './consulter-user.component.html',
  styleUrl: './consulter-user.component.css'
})
export class ConsulterUserComponent implements OnInit{
[x: string]: any;
  user: any; // Changed variable name to 'user'
  profileForm: FormGroup;
  memberinitial: User | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private memberService: MemberService,
    private autherService: AutherService,
    private loginSerive: LoginService,

  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.user = navigation.extras.state['auther'] || navigation.extras.state['member'];
      this.readData(this.user); // Call the method to read/display the data

    }

    this.profileForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z]+$/)]],
      prenom: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z]+$/)]],
      telephone1: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      telephone2: ['', Validators.pattern(/^[0-9]{8}$/)], // Optional
      dateDeNaissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateDinscription: ['', Validators.required], // Add this line
      nationalite: ['', Validators.required], // Add this line


    });
  }

  ngOnInit() {
    this.loadMemberData();
  }
  private loadMemberData() {
    // Ensure member and auther are defined
    const member = this.user; // Assuming you have a method to get member data
    const auther = this.user; // Assuming you have a method to get author data

    // Check user role and load appropriate data
    switch (this.user?.role) {
      case 'MEMBER':
        if (member) {
          // If the user role is MEMBER, load the member data
          this.profileForm.patchValue({
            nom: member.nom || '',
            prenom: member.prenom || '',
            telephone1: member.tel && member.tel[0] ? member.tel[0] : '', // Handle cases where tel may not exist
            telephone2: member.tel && member.tel[1] ? member.tel[1] : '', // Optional, handle if only one number exists
            dateDeNaissance: member.dateDeNaissance || '',
            email: member.email || '',
            dateDinscription: this.user.dateInscription || ''
          });
        } else {
          //disable readonly
        }
        break;

      case 'AUTHER':
        if (auther) {
          // If the user role is AUTHER, load the author data
          this.profileForm.patchValue({
            nom: auther.nom || '',
            prenom: auther.prenom || '',
            telephone1: auther.tel && auther.tel[0] ? auther.tel[0] : '', // Handle cases where tel may not exist
            telephone2: auther.tel && auther.tel[1] ? auther.tel[1] : '', // Optional, handle if only one number exists
            nationalite: this.user.nationalite || '',
            email: auther.email || ''
          });
        } else {
          console.error('Author data not found.');
        }
        break;

      default:
        break;
    }
  }




  onSubmit() {
    if (this.profileForm.valid) {
      this.trimFormValues(); // Call the trim method before processing the form

      const updatedMember: Member = { ...this.profileForm.value };

      // Collect the phone numbers into an array
      updatedMember.tel = [];
      if (updatedMember['telephone1']) {
        updatedMember.tel.push(updatedMember['telephone1']);
      }
      if (updatedMember['telephone2']) {
        updatedMember.tel.push(updatedMember['telephone2']);
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


      } else if((this.loginSerive.getMember()?.role)=="BIBLIOTHECAIRE") {

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
  readData(user: Auther | Member) {
    // Implement logic to display the user's data
    console.log("user : "+user.nom);
  }

  retour() {
    if(this.user.role="MEMBER")
      this.router.navigate(["liste-member"])
    else if(this.user.role="AUTHER")
      this.router.navigate(["liste-auther"])

  }

  ajouter() {
    
  }


}
