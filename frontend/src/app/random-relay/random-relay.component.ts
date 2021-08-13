import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-random-relay',
  templateUrl: './random-relay.component.html',
  styleUrls: ['./random-relay.component.scss']
})
export class RandomRelayComponent implements OnInit {

  constructor() { }

  private links = [
    "https://töffligpbollhof.ch/ah-mann/",
"https://töffligpbollhof.ch/zoom/",
"https://töffligpbollhof.ch/gif/",
"https://de.crazygames.com/spiele/wheelie-bike",
"https://fooby.ch/de/rezepte/14203/gschwellti?startAuto1=0",
"https://www.tutti.ch/de/vi/aargau/fahrzeuge/motorraeder/mocambo-original-renntoeffli/46850221",
"https://töffligpbollhof.ch/win/",
"https://töffligpbollhof.ch/dieser-herr",
"https://töffligpbollhof.ch/kiss/",
"https://töffligpbollhof.ch/gschwelltigeil/",
"https://toeffligpbollhof.ch/shot/",
"https://toeffligpbollhof.ch/jenny/",
"https://toeffligpbollhof.ch/burger/"
  ];

  ngOnInit() {
    const id = Math.floor(Math.random() * 100) % this.links.length;
    console.log(id);
    window.location.href = this.links[id];
  }

}
