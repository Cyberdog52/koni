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
    "https://der-schrauberling.de/lachgas-mofa/",
  ];

  ngOnInit() {
    const id = Math.floor(Math.random() * 100) % this.links.length;
    console.log(id);
    window.location.href = this.links[id];
  }

}
