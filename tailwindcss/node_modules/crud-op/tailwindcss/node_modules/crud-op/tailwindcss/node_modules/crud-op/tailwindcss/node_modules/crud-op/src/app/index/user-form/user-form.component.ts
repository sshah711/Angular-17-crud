import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder,FormControl,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { IUser } from '../../shared/models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnChanges {
  @Input() data: IUser | null = null;
  @Output() onCloseModel = new EventEmitter();

  form:FormGroup;

  constructor(private fb: FormBuilder , private userService:UserService, private toastService: ToastrService){
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl('', [Validators.required]),
      dob: new FormControl('', [Validators.required]),
      doj: new FormControl('', [Validators.required])
    });
  }
ngOnChanges(): void {
  if(this.data){
    this.form.patchValue({
      name: this.data?.name,
      email: this.data?.email,
      mobile: this.data?.mobile,
      dob: this.data?.dob,
      doj: this.data?.doj,
    });
  }
  
}

  onClose() {
    this.onCloseModel.emit(false);
  }

  submit(){
    if(this.form.valid){

      if(this.data){
        this.userService.update(this.data._id as string, this.form.value).subscribe({
          next:(response)=>{
            this.toastService.success(response.message);
            this.onClose();
          }
        })

      }else{
        this.userService.create(this.form.value).subscribe({
          next:(response)=>{
            this.onClose();
          }
        })
      }
      
      //...
    }else{
      this.form.markAllAsTouched();
    }
  }
}
