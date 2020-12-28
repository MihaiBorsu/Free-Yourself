import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { GuildComponent } from '../../guild/guild.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { StolenVehiclesComponent } from '../../stolen-vehicles/stolen-vehicles.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { LoginComponent } from '../../login/login.component';
import { RegisterComponent } from '../../register/register.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AuthGuard } from '../../helpers/auth.guard';

export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'user-profile',   component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: 'table-list',     component: TableListComponent, canActivate: [AuthGuard]},
    { path: 'guild',     component: GuildComponent, canActivate: [AuthGuard] },
    { path: 'stolen-vehicles',     component: StolenVehiclesComponent, canActivate: [AuthGuard] }, 
    { path: 'maps',           component: MapsComponent, canActivate: [AuthGuard] },

    { path: 'login',        component: LoginComponent },
    { path: 'register',        component: RegisterComponent },

    { path: 'notifications',  component: NotificationsComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
 
];
