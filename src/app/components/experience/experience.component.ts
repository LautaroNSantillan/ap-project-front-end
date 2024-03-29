import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Experience } from 'src/app/model/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { TokenService } from 'src/app/services/token.service';
import { WebUserService } from 'src/app/services/web-user.service';
import { CreateExpComponent } from './create-exp.component';
import { EditExpComponent } from './edit-exp/edit-exp.component';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { SwalService } from 'src/app/services/swal.service';
import { AuthService } from 'src/app/services/auth.service';
import { UploadImageService } from 'src/app/services/upload-image.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
})
export class ExperienceComponent implements OnInit {
  experience: Experience[] = [];
  isLogged = false;
  isProfile: boolean;

  constructor(
    private expService: ExperienceService,
    private tokenService: TokenService,
    private webUserService: WebUserService,
    private router: Router,
    private createDialog: MatDialog,
    private editDialog: MatDialog,
    private deleteDialog: MatDialog,
    private swal: SwalService,
    private auth: AuthService,
    private imageService: UploadImageService
  ) {}

  ngOnInit() {
    this.setIsProfile();
    this.setIsLoggedIn();

    const currentRoute = this.router.url;
    if (currentRoute == '/dashboard/profile') {
      this.loadExperience();
    } else {
      this.webUserService.getMe().subscribe({
        next: (data) => {
          this.experience = data.experience;
        },
      });
    }
  }
  setIsLoggedIn(){
    this.isLogged=this.auth.isLogged();
  }
  setIsProfile(): void {
    const currentRoute = this.router.url;
    if (currentRoute == '/dashboard/profile') this.isProfile = true;
    else this.isProfile = false;
  }
  resetImageURL(): void {
    this.imageService.imgURL = null;
  }

  loadExperience(): void {
    this.webUserService.getCurrentUserId().subscribe((userId) => {
      this.expService.getExpByIdList(userId).subscribe((res) => {
        this.experience = res;
      });
    });
  }
  disable(id?: number) {//obsolete
    if (id != undefined) {
      this.expService.disable(id).subscribe(
        (data) => {
          this.loadExperience();
        },
        (err) => {
          alert(err.error.msg);
        }
      );
    }
  }

  openCreate() {
   const dialogRef= this.createDialog.open(CreateExpComponent, {
      width: '60%',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.loadExperience();
      this.resetImageURL();
    });
  }

   openEdit(id:number){
   const dialogRef=  this.editDialog.open(EditExpComponent,{data:{expId: id}, width:'60%',});
   dialogRef.afterClosed().subscribe(result => {
    this.loadExperience();
    this.resetImageURL();
  });
   }
   
  openDeleteDialog(id: number, name: string) {
    this.swal.deleteDialog(id, name, () => {
      this.disable(id);
    });
  }
}
