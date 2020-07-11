package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.menu.Menu;
import com.andreskonrad.koni.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    @Autowired
    private MenuService menuService;

    @GetMapping("/ids")
    public Object getIds() {
        List<Long> menuIds = menuService.getIds();
        if (menuIds == null) {
            return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
        }
        return menuIds;
    }

    @GetMapping("/{id}")
    public Object get(@PathVariable("id") Long id) {
        Menu menu = menuService.get(id);
        if (menu == null) {
            return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
        }
        return menu;
    }

    @PostMapping("/{id}")
    public Object save(@PathVariable("id") Long id, @RequestBody Menu menu) {
        Menu savedMenu = menuService.save(menu);
        if (savedMenu == null) {
            return new ResponseEntity<HttpStatus> (HttpStatus.NOT_MODIFIED);
        }
        return savedMenu;
    }

    @GetMapping("/")
    public Object create() {
        Menu menu = menuService.create();
        if (menu == null) {
            return new ResponseEntity<HttpStatus> (HttpStatus.NOT_MODIFIED);
        }
        return menu;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> delete(@PathVariable("id") Long id) {
        menuService.delete(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
