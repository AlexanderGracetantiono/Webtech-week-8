import { Component, OnInit } from '@angular/core';
import { Matakuliah } from '../matakuliah';
import { Dosen } from '../dosen';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  dosen:Dosen[];
  dosenList:Array<Dosen>
  id = null;
  error = false;
  update = true;

  constructor(
    private _snackBar: MatSnackBar,
    private ds: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.ds.getAllDosen().subscribe(
      response => {
        this.dosen = response as Dosen[];
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
    this.ds.postMatkul(this.matkul).subscribe(response => {
      // tampilkan notifikasi
      this.openSnackBar("Mata Kuliah Added", null)
      this.router.navigate(['/main']);
    });
  }

  deleteMatkul() {
    this.ds.deleteMatkul(this.matkul).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Mata Kuliah Deleted", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateMatkul() {
    this.ds.updateMatkul(this.matkul).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Mata Kuliah Updated", null)
        this.router.navigate(['/main']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
