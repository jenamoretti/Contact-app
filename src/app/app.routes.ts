import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactsPage } from './pages/contact-page/contact-page';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { LoggedLayout } from './layouts/logged-layout/logged-layout';
import { RegisterPage } from './pages/register-page/register-page';
import { NewEditContact } from './pages/new-edit-contact/new-edit-contact';
import { onlyPublicUserGuard } from './guards/only-public-user-ward';
import { onlyLoggedUserGuard } from './guards/only-logged-user-ward';

export const routes: Routes = [
    {
        path: "login", 
        component: LoginPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "register",
        component: RegisterPage,
        canActivate: [onlyPublicUserGuard]
    },
    {
        path: "", 
        component: LoggedLayout, 
        canActivateChild: [onlyLoggedUserGuard],
        children: [
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
