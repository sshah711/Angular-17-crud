import { Component, OnInit } from '@angular/core';
import { ModelComponent } from "../../shared/model/model.component";
import { UserFormComponent } from "../user-form/user-form.component";
import { UserService } from '../../services/user.service';
import { IUser } from '../../shared/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-user',
    standalone: true,
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
    imports: [ModelComponent, UserFormComponent]
})
export class UserComponent implements OnInit{
  isModelOpen = false;
  users: IUser[] = [];
  user!: IUser;
  constructor(private userService:UserService, private toastService: ToastrService) {}

  ngOnInit(): void {
    this.getAll();
  }
  getAll(){
    this.userService.getAll().subscribe({
      next:(response)=>{
        this.users = response.data;
      },
    })
  }

  delete(id: string){
    this.userService.delete(id).subscribe({
      next:(response)=>{
     
        this.toastService.success(response.message);
        this.getAll();
      },
    });
  }

load(data:IUser){
  this.user = data;
  this.openModel();
  
}

  openModel() {
    this.isModelOpen = true;
  }

  closeModel() {
    this.isModelOpen = false;
    this.getAll();
  }
}
