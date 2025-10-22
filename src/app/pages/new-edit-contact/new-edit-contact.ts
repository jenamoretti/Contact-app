import { Component, inject, OnInit, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Contact, NewContact } from '../../interfaces/contact';
import { ContactService } from '../../services/contacts-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Spinner } from '../../components/spinner/spinner';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule, Spinner],
  templateUrl: './new-edit-contact.html',
  styleUrl: './new-edit-contact.scss'
})
export class NewEditContact implements OnInit {
  contactsService = inject(ContactService);
  router = inject(Router)
  route = inject(ActivatedRoute);
  
  errorEnBack = false;
  idContacto: number | null = null;
  contactoOriginal: Contact | undefined = undefined;
  form = viewChild.required<NgForm>('newContactForm');
  isLoading = false;

  async ngOnInit() {
    // Obtener el ID del contacto de los parámetros de la ruta
    const idParam = this.route.snapshot.paramMap.get('idContacto');
    
    if (idParam) {
      this.idContacto = Number(idParam);
      
      try {
        this.isLoading = true;
        this.contactoOriginal = await this.contactsService.getContactById(this.idContacto);
        
        if (this.contactoOriginal && this.form()) {
          this.form()!.setValue({
            firstName: this.contactoOriginal.firstName || '',
            lastName: this.contactoOriginal.lastName || '',
            address: this.contactoOriginal.address || '',
            email: this.contactoOriginal.email || '',
            image: this.contactoOriginal.image || '',
            number: this.contactoOriginal.number || '',
            company: this.contactoOriginal.company || '',
          });
        }
      } catch (error) {
        this.errorEnBack = true;
      } finally {
        this.isLoading = false;
      }
    }
  }

  async handleFormSubmission(form: NgForm) {
    if (form.invalid) return;
    
    this.errorEnBack = false;
    const nuevoContacto: NewContact = {
      firstName: form.value.firstName,
      lastName: form.value.lastName || '',
      address: form.value.address || '',
      email: form.value.email || '',
      image: form.value.image || '',
      number: form.value.number,
      company: form.value.company || '',
      isFavorite: false
    }
    
    let res;

    this.isLoading = true;
    try {
      if (this.idContacto) {
        res = await this.contactsService.editContact({ ...nuevoContacto, id: this.idContacto });
      } else {
        res = await this.contactsService.createContact(nuevoContacto);
      }
      
      if (!res) {
        this.errorEnBack = true;
        return;
      }
      
      this.router.navigate(["/contact", res.id]);
    } catch (error) {
      this.errorEnBack = true;
    } finally {
      this.isLoading = false;
    }
  }
}