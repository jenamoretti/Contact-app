import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { ContactPage } from './pages/contact-page/contact-page';
import { ContactDetailsPage } from './pages/contact-details-page/contact-details-page';
import { LoggedLayout } from './layouts/logged-layout/logged-layout';

export const routes: Routes = [
    {
        path: "", component: LoginPage
    },
    {
        path: "", component: LoggedLayout, children: [
            {
                path: "contact", component: ContactPage
            },
            {
                path: "contact/:id", component: ContactDetailsPage
            },
            ]
    }
];
