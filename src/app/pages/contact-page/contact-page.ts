import { Component } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactListItem } from '../../components/contact-list-item/contact-list-item';
import { inject } from '@angular/core';
import { ContactService } from '../../services/contact-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-page',
  imports: [ContactListItem, FormsModule],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss'
})
export class ContactPage {
  contactService = inject(ContactService);

  createContact(form: any) {
    const newContact: Contact = {
      firstName: form.firstName || '',
      lastName: form.lastName || '',
      address: form.address || '',
      number: form.number || '',
      email: form.email || '',
      company: form.company || '',
      image: '',
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) // Genera un ID único
    }
    console.log(newContact);
    this.contactService.createContact(newContact);
  }
}
