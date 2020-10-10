import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  year: number = this.getCurrentYear();

  constructor() { }

  ngOnInit(): void {
  }

  getCurrentYear() {
    return new Date().getFullYear();
  }

}
