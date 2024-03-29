import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  isLogged:boolean=false;
    constructor(private auth: AuthService){}

    ngOnInit(): void {
      this.isLogged=this.auth.isLogged();
    }
}
