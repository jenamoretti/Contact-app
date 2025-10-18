import { Component, Input, inject } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactService } from '../../services/contacts-service';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-list-item',
  imports: [RouterModule],
  templateUrl: './contact-list-item.html',
  styleUrls: ['./contact-list-item.scss']
})
export class ContactListItem {
  @Input() contact!: Contact;
  router = inject(Router);
  contactsService = inject(ContactService);

  editContact() {
    this.router.navigate(['/contacts/edit', this.contact.id]);
  }

  async deleteContact() {
    const result = await Swal.fire({
      title: `¿Eliminar a ${this.contact.firstName}?`,
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await this.contactsService.deleteContact(this.contact.id);
        Swal.fire(
          'Eliminado!',
          `${this.contact.firstName} ha sido eliminado.`,
          'success'
        );
      } catch (error) {
        Swal.fire(
          'Error!',
          'No se pudo eliminar el contacto.',
          'error'
        );
      }
    }
  }
}
