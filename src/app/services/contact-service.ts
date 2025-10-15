import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts:Contact[] = [
    {
      id: "1",
      firstName: "Jenaro",
      lastName: "Lopez",
      address: "123456789",
      email: "jmoretti@gmail.com",
      number: "987654321",
      image: "",
      company: "LND Apps",
    }
  ]
 
  createContact(newContact: Contact){
    this.contacts.push(newContact);
  }

  editContact(){}

  deleteContact(){}
}
