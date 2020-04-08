import { Component, OnInit, ViewChild } from '@angular/core';
import { Dosen } from '../dosen';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './dosen-list.component.html',
  styleUrls: ['./dosen-list.component.scss']
})
export class DosenListComponent implements OnInit {
  dosen: Dosen[];
  error:boolean;
  displayedColumns: string[] = ['nama', 'lulusan1', 'lulusan2', 'lulusan3','jumlahSKSAjar'];

  constructor(
    private ds: DataService,
  ) {}

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
  }

}
