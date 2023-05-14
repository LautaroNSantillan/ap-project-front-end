import { Component, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { WebUser } from 'src/app/model/web-user';
import { UserService } from 'src/app/services/user.service';
import { WebUserService } from 'src/app/services/web-user.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  webUser: WebUser;

  @ViewChild('skillsContainer', { read: ViewContainerRef }) skillsContainer: ViewContainerRef;
  @ViewChild('educationContainer', { read: ViewContainerRef }) educationContainer: ViewContainerRef;
  @ViewChild('experienceContainer', { read: ViewContainerRef }) experienceContainer: ViewContainerRef;

  constructor(public userService: UserService, 
    private webUserService: WebUserService,
    private aRouter: ActivatedRoute,
    private titleService: Title){}

  ngOnInit(): void {
    this.setUser();
    this.setTitle();
  }

  setTitle() {
    this.aRouter.data.subscribe((data) => {
      this.titleService.setTitle(data['title']);
    });
  }

  setUser(){
    this.webUserService.getCurrentUser().subscribe({
      next:data=>{
        this.webUser=data;
      }
    });
  }

}

