import { Component, OnInit } from '@angular/core';
import {MenuService} from "./menu.service";
import {Menu, Recipe} from "../shared/model/menu-dtos";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private menuService: MenuService) { }

  menus: Map<number, Menu> = new Map();

  displayedColumns: string[] = ['name', 'edit', 'delete'];

  ngOnInit() {
    this.loadAllMenus();
  }

  getMenus(): Menu[] {
    return Array.from( this.menus.values());
  }

  getMenu(id: number): Menu {
    return this.menus.get(id);
  }

  saveMenu(id: number) {
    const menu = this.getMenu(id);
    if (menu == null) {
      return;
    }
    this.menuService.save(menu).subscribe(savedMenu => {
      this.menus.set(menu.id, menu);
    })
  }

  createMenu() {
    this.menuService.create().subscribe(menu => {
      this.menus.set(menu.id, menu);
    })
  }

  loadAllMenus() {
    this.menuService.getIds().subscribe(ids => {
      ids.forEach( id => {
          this.loadMenu(id);
        }
      );
    });
  }

  deleteMenu(id: number) {
    this.menuService.delete(id).subscribe(() => {
      this.loadAllMenus();
    });
    this.menus.delete(id);
  }

  loadMenu(id: number): void {
    this.menuService.loadMenu(id).subscribe(menu => {
      this.menus.set(id, menu);
    });
  }

  addRecipe(menu: Menu)  {
    const recipe = new Recipe();
    menu.recipeMap.set(recipe, 0);

}

  editMenu(id: number) {
    //TODO
  }
}
