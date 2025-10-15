import { inject, Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts:Contact[] = []
  authService = inject(AuthService);
 
  async getContacts() {
    const res = await fetch("https://agenda-api.somee.com/api/contacts",
      {
        headers: {
          Authorization: "Bearer "+this.authService.token,
        }
      }
    );
    const resJson = await res.json();
    this.contacts = resJson;
  }

  async getContactById(id: string | number){
    const res = await fetch(`https://agenda-api.somee.com/api/contacts/${id}`,
      {
        headers: {
          Authorization: "Bearer "+this.authService.token,
        }
      }
    );
    if(res.ok){
      const resJson = await res.json();
      return resJson;
    }
  }

  async setFavourite(id:string | number ) {
    const res = await fetch(`https://agenda-api.somee.com/api/contacts/${id}/favourite/`, 
      {
        method: "POST",
        headers: {
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if(!res.ok) return;
    this.contacts = this.contacts.map(contact => {
      if(contact.id === id) {
        return {...contact, isFavorite: !contact.isFavorite};
      };
      return contact;
    });
    return true;
  }
  
  createContact(newContact: Contact){
    this.contacts.push(newContact);
  }

  editContact(){}

  async deleteContact(id:string | number){
    const res = await fetch(`https://agenda-api.somee.com/api/contacts/${id}`, 
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer "+this.authService.token,
        },
      });
    if(!res.ok) return;
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    return true;
  }
  
}
