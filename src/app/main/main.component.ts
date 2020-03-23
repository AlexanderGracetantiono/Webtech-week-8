import { Component, OnInit, ViewChild } from '@angular/core';
import { Hero } from '../hero';
import { DataService } from '../data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  heroes: Hero[];
  error:boolean;
  displayedColumns: string[] = ['heroName', 'realName', 'skill', 'universe'];

  constructor(
    private ds: DataService,
  ) {}

  ngOnInit(): void {
    this.ds.getHeroes().subscribe(
      response => {
        this.heroes = response as Hero[];
      },
      err => {
        console.log(err);
        this.error = true;
      }
    );
  }

}
