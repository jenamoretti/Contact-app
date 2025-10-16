import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactsPage } from './pages/contact-page/contact-page';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { LoggedLayout } from './layouts/logged-layout/logged-layout';
import { RegisterPage } from './pages/register-page/register-page';
import { NewEditContact } from './pages/new-edit-contact/new-edit-contact';

export const routes: Routes = [
    {
        path: "login", 
        component: LoginPage
    },
    {
        path: "register",
        component: RegisterPage
    },
    {
        path: "", component: LoggedLayout, children: [
            {
                path: "", 
                component: ContactsPage
            },
            {
                path: "contact/:id", 
                component: ContactDetailsPage
            },{
                path: "contacts/new",
                component: NewEditContact
            },{
                path: "contacts/:idContacto/edit",
                component: NewEditContact
            },
            ]
    }
];  
