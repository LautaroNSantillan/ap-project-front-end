import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from '../profile/profile.component';
import { CreateExpComponent } from '../experience/create-exp.component';
import { EditExpComponent } from '../experience/edit-exp/edit-exp.component';
import { CreateEduComponent } from '../education/create-edu/create-edu.component';
import { EditEduComponent } from '../education/edit-edu/edit-edu.component';
import { CreateSkillComponent } from '../skills/create-skill/create-skill.component';
import { EditSkillComponent } from '../skills/edit-skill/edit-skill.component';
import { EditAboutComponent } from '../about/edit-about/edit-about.component';

const routes: Routes = [
  {path: '', component:DashboardComponent, children:[
    {path:'', component:HomeComponent},
    {path:'home', component:HomeComponent},
    {path:'create-experience', component:CreateExpComponent},
    {path:'edit-experience/:id', component:EditExpComponent},
    {path:'edit-education/:id', component:EditEduComponent},
    {path:'create-education', component:CreateEduComponent},
    {path:'create-skill', component:CreateSkillComponent},
    {path:'edit-skill/:id', component:EditSkillComponent},
    {path:'edit-web-user/:id', component:EditAboutComponent},
    {path:'profile', component:ProfileComponent},
    {path:'**', component:HomeComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
