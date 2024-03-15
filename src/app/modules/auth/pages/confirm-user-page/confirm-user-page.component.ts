import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-confirm-user-page',
  templateUrl: './confirm-user-page.component.html',
  styleUrls: ['./confirm-user-page.component.css']
})
export class ConfirmUserPageComponent implements OnInit, AfterViewInit {

  token: string =""
  message: string = ""

  constructor(private route: ActivatedRoute, private authService: AuthService){

  }

  ngOnInit(): void {
    this.route.params.subscribe((param: any) => {
     this.token = param.token
    })
  }

  ngAfterViewInit(): void {
    console.log(this.token)
    this.authService.confirmUser(this.token).subscribe((response: any) => {
      this.message = response.msg
    })
  }
}
