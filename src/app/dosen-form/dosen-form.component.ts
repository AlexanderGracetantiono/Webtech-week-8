import { Component, OnInit } from '@angular/core';
import { Dosen } from '../dosen';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router
  ) { }
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
    this.ds.createDosen(this.dosen).subscribe(response => {
      // tampilkan notifikasi
      this.openSnackBar("Dosen Added", null)
      this.router.navigate(['/dosenList']);
    });
  }

  deleteDosen() {
    this.ds.deleteDosen(this.dosen).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Dosen Deleted", null)
        this.router.navigate(['/dosenList']);
      },
      err => {
        console.log(err);
      }
    );
  }

  updateDosen() {
    this.ds.updateDosen(this.dosen).subscribe(
      response => {
        // tampilkan notifikasi
        this.openSnackBar("Dosen Updated", null)
        this.router.navigate(['/dosenList']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
