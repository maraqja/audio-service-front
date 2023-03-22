import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submited = false
  form: FormGroup = new FormGroup({})

  constructor(
  private authService: AuthService,
  private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  submit() {
    console.log(this.form.value)
    if (this.form.invalid) {
      return
    }
    this.submited = true

    const user: Pick<User, 'username' | 'password'> = {
      username: this.form.value.username,
      password: this.form.value.password
    }
    this.authService.login(user).subscribe( (res) => {
      // console.log(res)
      this.form.reset()
      this.router.navigate([''])
      this.submited = false
      this.authService.setFavoriteTracks()
      window.location.reload()

    })
  }
}
