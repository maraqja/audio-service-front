import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  submited = false
  form: FormGroup = new FormGroup({})

  constructor(
    private authService: AuthService,
    private router: Router
    ) {

  }




    ngOnInit() {
      this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })
    }

  submit() {
    console.log(this.form.value)
    if (this.form.invalid) {
      return
    }
    this.submited = true
    const user: Pick<User, 'username' | 'email' | 'password'> = {
      username: this.form.value.username,
      email: this.form.value.email,
      password: this.form.value.password
    }

    this.authService.createUser(user).subscribe( (res) => {
      console.log(res)
      this.form.reset()
      this.router.navigate(['/login'])
      this.submited = false
    })

  }


}
