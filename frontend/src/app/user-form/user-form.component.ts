import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, User } from '../services/user.service';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule,HttpClientModule],
  templateUrl: './user-form.html',
})
export class UserFormComponent {
  user: User = { name: '', email: '', address: '',};
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Errorrr:', err);
      }
    });
  }

  submitForm() {
    this.userService.addUser(this.user).subscribe({
      next: (newUser) => {
        this.users.push(newUser);
        this.user = { name: '', email: '', address: '' };
      },
      error: (err) => {
        console.error('Error:', err);
      }
    });
  }


  deleteUser(id?: number) {
    if (id === undefined) return;

    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });
  }



}
