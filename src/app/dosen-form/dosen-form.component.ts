import { Component, OnInit } from '@angular/core';
import { Dosen } from '../dosen';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder,Validators } from '@angular/forms';

@Component({
  selector: 'app-dosen-form',
  templateUrl: './dosen-form.component.html',
  styleUrls: ['./dosen-form.component.scss']
})
export class DosenFormComponent implements OnInit {
  dosen: Dosen = {
    _id: '',
    nama: '',
    lulusan1: '',
    lulusan2: '',
    lulusan3: '',
    jumlahSKSAJar: 0
  };
  id = null;
  error = false;
  update = true;

  constructor(
    private _snackBar: MatSnackBar,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }
 dosenForm=this.formBuilder.group({
    nama: ["", [Validators.required, Validators.minLength(5)]],
    lulusan1: ["", [Validators.required]],
    lulusan2: ["", [Validators.required]],
    lulusan3: ["", [Validators.required]],
//     jumlahSKSAJar: ["", [Validators.required]],
  })
  name = this.dosenForm.get("nama");
  lulusan1 = this.dosenForm.get("lulusan1");
  lulusan2 = this.dosenForm.get("lulusan2");
  lulusan3 = this.dosenForm.get("lulusan3");
  jumlahSKSAJar = 0;

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // jika ada parameter id di URL
      if (params.get('id')) {
        this.id = params.get('id');

        this.ds.getDosen(this.id).subscribe(
          response => {
            this.dosen = response as Dosen;
          },
          err => {
            console.log(err);
            this.error = true;
          }
        );
      } else {
        this.update = false;
      }
    });
  }

  createDosen() {
    
    const param =this.dosenForm.value;
    delete param.check;
    this.ds.createDosen(this.dosenForm.value).subscribe(response => {
      // tampilkan notifikasi
      this.openSnackBar("Dosen "+this.dosenForm.value.nama+" Added", null)
      this.router.navigate(['/dosenList']);
    });
  }
  
  deleteDosen() {
    this.ds.deleteDosen(this.id).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Dosen "+this.dosenForm.value.nama+" Deleted", null)
        this.router.navigate(['/dosenList']);
      },
      err => {
        console.log(err);
      }
      );
    }
    
    updateDosen() {
      this.ds.updateDosen(this.id,this.dosenForm.value).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Dosen "+this.dosenForm.value.nama+" Updated", null)
        this.router.navigate(['/dosenList']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
