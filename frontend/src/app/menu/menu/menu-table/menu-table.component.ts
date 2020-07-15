import { Component, OnInit } from '@angular/core';
import {MenuService} from "../menu.service";
import {Menu, Recipe} from "../../../shared/model/menu-dtos";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'menu-table',
  templateUrl: './menu-table.component.html',
  styleUrls: ['./menu-table.component.scss']
})
export class MenuTableComponent implements OnInit {

  constructor(private menuService: MenuService, public dialog: MatDialog, private router: Router ) { }

  menus: Map<number, Menu> = new Map();

  displayedColumns: string[] = ['name', 'recipeCount', 'edit', 'delete', ];

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
      this.menus.set(savedMenu.id, savedMenu);
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
    const dialogRef = this.dialog.open(DialogDeleteMenu);

    dialogRef.afterClosed().subscribe(userClickedDelete => {
      if (userClickedDelete) {
        this.menuService.delete(id).subscribe(() => {
          this.loadAllMenus();
        });
        this.menus.delete(id);
      }
    });

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
    this.router.navigate(['/menu', id]);
  }

  getRecipeCount(menu: Menu) : number {
    if (menu.recipeMap) {
      const values = Object.keys(menu.recipeMap).map(function(key) {
        return menu.recipeMap[key];
      });
      return values.length;
    }
    return 0;
  }
}

@Component({
  selector: 'dialog-delete-menu',
  templateUrl: '../delete-menu-dialog.html',
})
export class DialogDeleteMenu {}
