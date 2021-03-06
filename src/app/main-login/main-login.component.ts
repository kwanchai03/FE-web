import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.css'],
  providers: [LoginService]
})
export class MainLoginComponent implements OnInit {

  userLogin: FormGroup;
  loading: boolean;

  constructor(private fb: FormBuilder, private router: Router,
    private loginService: LoginService) {
    this.userLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit() {
    this.loading = false;
  }

  onLogin() {
    const md5 = new Md5();
    this.loading = true;

    // console.log(md5.appendStr(this.userLogin.value.password).end());
    this.userLogin.value.password = md5.appendStr(this.userLogin.value.password).end();
     this.loginService.loginUser(this.userLogin.value).subscribe(
       response => {
         console.log('response', response);
         if (response['status'] === 401) {
            alert(response['msg']);
            location.reload();
         } else if ( response['body'] !== null) {
            console.log('token', response['body'][0].token);
            localStorage.setItem('token', response['body'][0].token);
            localStorage.setItem('user', this.userLogin.value.username);
            localStorage.setItem('permission', response['body'][0].permission);
            if (localStorage.getItem('permission') === "ADMIN" || localStorage.getItem('permission') === "SUPERADMIN" ) {
              this.router.navigate(['/admin/userMN']);
            } else if (localStorage.getItem('permission') === "USER") {

              this.router.navigate(['/mado/listproduct']);
              // location.reload();
              setTimeout(() => {
                location.reload();
              }, 100);
            } else {
              this.router.navigate(['/main-login']);
              location.reload();
            }

         } else {
           console.log('login invalid');
           alert('login invalid');
           location.reload();
         }
       },
       error => {
         console.log('error', error);
       }
     );
    console.log(this.userLogin.value);
  }



}
