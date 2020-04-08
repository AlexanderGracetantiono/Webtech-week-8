import { Component, OnInit, ViewChild } from '@angular/core';
import { Matakuliah } from '../matakuliah';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  matkul: Matakuliah[];
  error:boolean;
  displayedColumns: string[] = ['nama', 'ruang', 'dosen', 'jumlahSks','semester','tahunAkademik'];

  constructor(
    private ds: DataService,
  ) {}

  ngOnInit(): void {
    this.ds.getAllMatkul().subscribe(
      response => {
        this.matkul = response as Matakuliah[];
      },
      err => {
        console.log(err);
        this.error = true;
      }
    );
  }

}
