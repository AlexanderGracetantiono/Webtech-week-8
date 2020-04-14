import { Component, OnInit } from '@angular/core';
import { Matakuliah } from '../matakuliah';
import { Dosen } from '../dosen';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder,Validators } from '@angular/forms';
@Component({
  selector: 'app-matkul-form',
  templateUrl: './matkul-form.component.html',
  styleUrls: ['./matkul-form.component.scss']
})
export class MatakuliahFormComponent implements OnInit {
  matkul: Matakuliah = {
    _id: '',
    nama: '',
    ruang: '',
    dosen: '',
    jumlahSks: 0,
    semester:0,
    tahunAkademik:''
  };
  dosens:Dosen[];
  dosenList:Array<Dosen>
  id = null;
  error = false;
  update = true;

  constructor(
    private _snackBar: MatSnackBar,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuild:FormBuilder
  ) { }
  matkulForm=this.formBuild.group({
    nama: ["", [Validators.required, Validators.minLength(5)]],
    ruang: ["", [Validators.required]],
    jumlahSks: ["", [Validators.required]],
    semester: ["", [Validators.required]],
    tahunAkademik: ["", [Validators.required]],
    dosen: ["", [Validators.required]],
  })
  name = this.matkulForm.get("nama");
  ruang = this.matkulForm.get("ruang");
  jumlahSks = this.matkulForm.get("jumlahSks");
  semester = this.matkulForm.get("semester");
  tahunAkademik = this.matkulForm.get("tahunAkademik");
  dosen = this.matkulForm.get("dosen");


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.ds.getAllDosen().subscribe(
      response => {
        this.dosens = response as Dosen[];
      },
      err => {
        console.log(err);
        this.error = true;
      }
    );
    this.route.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');

        this.ds.getMatkul(this.id).subscribe(
          response => {
            this.matkul = response as Matakuliah;
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

  postMatkul() {
    const param =this.matkulForm.value;
    delete param.check;
    this.ds.postMatkul(this.matkulForm.value).subscribe(response => {
      // tampilkan notifikasi
      this.openSnackBar("Mata Kuliah "+this.matkulForm.value.nama+" Added", null)
      this.router.navigate(['/main']);
    });
  }

  deleteMatkul() {
    this.ds.deleteMatkul(this.id).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Mata Kuliah "+this.matkulForm.value.nama+" Deleted", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateMatkul() {
    this.ds.updateMatkul(this.id,this.matkulForm.value).subscribe(
      response => {
        // tampilkan notifikasi
        // this.openSnackBar("Mata Kuliah "+this.matkulForm.value.nama+" Updated", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
