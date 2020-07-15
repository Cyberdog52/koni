import {Component, OnInit} from '@angular/core';
import {Menu} from "../../../shared/model/menu-dtos";
import {ActivatedRoute} from "@angular/router";
import {MenuService} from "../menu.service";

@Component({
  selector: 'menu-overiew',
  templateUrl: './menu-overview.component.html',
  styleUrls: ['./menu-overview.component.scss']
})
export class MenuOverviewComponent implements OnInit {

  menu: Menu;
  id: number;

  constructor(private route: ActivatedRoute, private menuService: MenuService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.loadMenu();
  }

  private loadMenu() {
    this.menuService.loadMenu(this.id).subscribe(loadedMenu => {
      console.log(loadedMenu);
      this.menu = loadedMenu;
    })
  }

}
