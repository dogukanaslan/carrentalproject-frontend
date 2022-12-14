import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup

  constructor(private formBuilder:FormBuilder, private toastrService:ToastrService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  
  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      email:["", Validators.required],
      password:["", Validators.required]
    })
  }

  register(){
    if(this.registerForm.valid){
     console.log(this.registerForm.value);
     let registerModel = Object.assign({}, this.registerForm.value);
     this.authService.register(registerModel).subscribe(response=>{
      this.toastrService.success(response.message);
      localStorage.setItem("token", response.data.token);
      this.router.navigate([""]);
     },responseError=>{
       this.toastrService.error(responseError.error);
     })
    }
  }
}
