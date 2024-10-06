import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { Member } from '../../shared/models/member';
import { MemberService } from '../../shared/services/member.service';
import { LoginService } from '../../shared/services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-member',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './profile-member.component.html',
  styleUrls: ['./profile-member.component.css']
})
export class ProfileMemberComponent implements OnInit {
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private memberService: MemberService,
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
    const member = this.loginSerive.getMember(); // Assuming it returns a Member object
    this.profileForm.patchValue({
      nom: member?.nom,
      prenom: member?.prenom,
      telephone1: member?.tel[0] || '', // Assuming tel is an array
      telephone2: member?.tel[1] || '', // Optional, handle if only one number exists
      dateDeNaissance: member?.dateDeNaissance,
      email: member?.email
    });
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

      // Call the service to update the member
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
  retour(){
    this.router.navigate(["home-member"])
  }
}
