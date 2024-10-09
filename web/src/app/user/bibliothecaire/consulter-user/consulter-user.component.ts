import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Member } from '../../../shared/models/member';
import { User } from '../../../shared/models/user';
import { LoginService } from '../../../shared/services/login.service';
import { MemberService } from '../../../shared/services/member.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet,Router, ActivatedRoute } from '@angular/router';
import { BibliothecaireService } from '../../../shared/services/bibliothecaire.service';
import { AutherService } from '../../../shared/services/auther.service';
import { Auther } from '../../../shared/models/auther';
import { Admin } from '../../../shared/models/admin';
import { Bibliothecaire } from '../../../shared/models/bibliothecaire';
import { AdminService } from '../../../shared/services/admin.service';

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
  userCourant:User | null=null;
  memberinitial: User | undefined;
  role:string="";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private memberService: MemberService,
    private autherService: AutherService,
    private adminService: AdminService,
    private route: ActivatedRoute,

    private bibliothecaireService: BibliothecaireService,

    private loginSerive: LoginService,

  ) {
    this.userCourant=this.loginSerive.getMember();
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.user = navigation.extras.state['auther'] || navigation.extras.state['member'] || navigation.extras.state['bibliothecaire'];
    }

    this.profileForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      prenom: ['', [Validators.required, Validators.minLength(4), Validators.pattern(/^[a-zA-Z\s]+$/)]],
      telephone1: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      telephone2: ['', Validators.pattern(/^[0-9]{8}$/)], // Optional
      dateDeNaissance: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateDinscription: [''], // Made this field optional
      nationalite: ['', Validators.required], // Add this line
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern('(?=.*[0-9])(?=.*[!@#$%^&*+-]).*'),
        ],
      ],

    });
  }

  ngOnInit() {
    this.loadMemberData();
    this.role = this.route.snapshot.paramMap.get('role') || ''; // Default to an empty string if null
  }

  private loadMemberData() {
    // Ensure member and auther are defined
    const member = this.user; // Assuming you have a method to get member data
    const auther = this.user; // Assuming you have a method to get author data
    const bibliothecaire = this.user; // Assuming you have a method to get author data

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
          //configuration de user auther
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
        }

        else {
          console.error('Author data not found.');
        }
        break;

        case 'BIBLIOTHECAIRE':
          if (bibliothecaire) {
            // If the user role is AUTHER, load the author data
            this.profileForm.patchValue({
              nom: bibliothecaire.nom || '',
              prenom: bibliothecaire.prenom || '',
              telephone1: bibliothecaire.tel && bibliothecaire.tel[0] ? bibliothecaire.tel[0] : '', // Handle cases where tel may not exist
              telephone2: bibliothecaire.tel && bibliothecaire.tel[1] ? bibliothecaire.tel[1] : '', // Optional, handle if only one number exists
              email: bibliothecaire.email || ''
            });
          }

          else {
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
      const updatedAdmin: Admin = { ...this.profileForm.value };
      const saveAuther: Auther = { ...this.profileForm.value };
      const saveBibliothecaire: Bibliothecaire = { ...this.profileForm.value };

      updatedMember.statut = true;
      updatedAdmin.statut = true;
      saveAuther.statut = true;
      saveBibliothecaire.statut = true;

      // Ensure that the phone number arrays are initialized
      updatedMember.tel = updatedMember.tel || [];
      saveAuther.tel = saveAuther.tel || [];
      saveBibliothecaire.tel = saveBibliothecaire.tel || [];
      updatedAdmin.tel = updatedAdmin.tel || [];

      if (this.loginSerive.getMember()?.role === 'MEMBER') {
        if (updatedMember['telephone1']) {
          updatedMember.tel.push(updatedMember['telephone1']);
        }
        if (updatedMember['telephone2']) {
          updatedMember.tel.push(updatedMember['telephone2']);
        }
      } else if (this.loginSerive.getMember()?.role === 'AUTHER') {
        saveAuther.tel.push(updatedMember['telephone1']);
        if (updatedMember['telephone2']) {
          saveAuther.tel.push(updatedMember['telephone2']);
        }
        saveAuther.nationalite = this.loginSerive.getMember().nationalite;
      } else if (this.loginSerive.getMember()?.role === 'BIBLIOTHECAIRE') {
        saveBibliothecaire.tel.push(updatedMember['telephone1']);
        if (updatedMember['telephone2']) {
          saveBibliothecaire.tel.push(updatedMember['telephone2']);
        }
        saveBibliothecaire.matricule = this.loginSerive.getMember().matricule;
      } else if (this.loginSerive.getMember()?.role === 'ADMIN') {
        updatedAdmin.tel.push(updatedMember['telephone1']);
        if (updatedMember['telephone2']) {
          updatedAdmin.tel.push(updatedMember['telephone2']);
        }
      }

      // Now proceed with the rest of the logic for updating the member's profile...
      if (this.loginSerive.getMember()?.role === 'MEMBER') {
        this.memberService.updateMember(updatedMember).subscribe(
          response => {
            console.log('Profile updated successfully', response);
            this.router.navigate(['home-member']);
            this.loginSerive.setMember(response);
          },
          error => {
            console.error('Error updating profile', error);
          }
        );
      } else if (this.loginSerive.getMember()?.role === 'AUTHER') {
        this.autherService.updateAuther(saveAuther).subscribe(
          response => {
            console.log('Profile updated successfully', response);
            this.router.navigate(['home-auther']);
            this.loginSerive.setMember(response);
          },
          error => {
            console.error('Error updating profile', error);
          }
        );
      } else if (this.loginSerive.getMember()?.role === 'BIBLIOTHECAIRE') {
        this.bibliothecaireService.updateBibliothecaire(saveBibliothecaire).subscribe(
          response => {
            console.log('Profile updated successfully', response);
            this.router.navigate(['home-bibliothecaire']);
            this.loginSerive.setMember(response);
          },
          error => {
            console.error('Error updating profile', error);
          }
        );
      } else if (this.loginSerive.getMember()?.role === 'ADMIN') {
        this.adminService.updateAdmin(updatedAdmin).subscribe(
          response => {
            console.log('Profile updated successfully', response);
            this.router.navigate(['home-admin']);
            this.loginSerive.setMember(response);
          },
          error => {
            console.error('Error updating profile', error);
          }
        );
      } else {
        this.router.navigate(['login']);
      }
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
    console.log(this.userCourant?.role);
    if (this.user && this.user.role) {
      if (this.user.role === "MEMBER") {
        this.router.navigate(["liste-member"]);
      } else if (this.user.role === "AUTHER") {
        this.router.navigate(["liste-auther"]);
      }
      else if(this.user?.role=="BIBLIOTHECAIRE"){
        this.router.navigate(["liste-bibliothecaire"]);

    }
    }
    else if(this.userCourant?.role=="BIBLIOTHECAIRE"){
      this.router.navigate(["liste-auther"]);
    }
    else if(this.userCourant?.role=="ADMIN"){
      this.router.navigate(["liste-bibliothecaire"]);
    }
    else
    {
      console.error('Utilisateur non défini ou rôle non trouvé.');
      // Vous pouvez rediriger vers une page par défaut ou afficher un message d'erreur
      this.router.navigate(["login"]);
    }
  }

  ajouter() {

    if(this.role=="bibliothecaire") {
      if (this.profileForm.valid || this.profileForm.get('dateDinscription')?.value === '') { // Check if form is valid or dateDinscription is empty
        const newBibliothecaire: Bibliothecaire = { ...this.profileForm.value };
        newBibliothecaire.tel = [];
        const telephone1 = this.profileForm.get('telephone1')?.value;
        const telephone2 = this.profileForm.get('telephone2')?.value;

        if (telephone1) {
          newBibliothecaire.tel.push(telephone1);
        }
        if (telephone2) {
          newBibliothecaire.tel.push(telephone2);
        }

        this.bibliothecaireService.saveBibliothecaire(newBibliothecaire).subscribe(
          response => {
            console.log('Auteur ajouté avec succès', response);
            this.router.navigate(["liste-bibliothecaire"]);
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'auteur', error);
          }
        );
      } else {
        console.log('Formulaire invalide', this.profileForm.errors);
      }
    } else if(this.role=="auther")  {

      if (this.profileForm.valid || this.profileForm.get('dateDinscription')?.value === '') { // Check if form is valid or dateDinscription is empty
        const newAuther: Auther = { ...this.profileForm.value };
        newAuther.tel = [];
        const telephone1 = this.profileForm.get('telephone1')?.value;
        const telephone2 = this.profileForm.get('telephone2')?.value;

        if (telephone1) {
          newAuther.tel.push(telephone1);
        }
        if (telephone2) {
          newAuther.tel.push(telephone2);
        }

        this.autherService.saveAuther(newAuther).subscribe(
          response => {
            console.log('Auteur ajouté avec succès', response);
            this.router.navigate(["liste-auther"]);
          },
          error => {
            console.error('Erreur lors de l\'ajout de l\'auteur', error);
          }
        );
      } else {
        console.log('Formulaire invalide', this.profileForm.errors);
      }

    }


  }




}
