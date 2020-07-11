package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.menu.Menu;
import com.andreskonrad.koni.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MenuService {


    @Autowired
    private MenuRepository menuRepository;


    public List<Long> getIds() {
        ArrayList<Long> idList = new ArrayList<>();
        menuRepository.findAll()
                .forEach(menu -> idList.add(menu.getId()));
        return idList;
    }

    public Menu get(Long id) {
        return menuRepository.findById(id).orElse(null);
    }

    public Menu save(Menu menu) {
        return menuRepository.save(menu);
    }

    public void delete(Long id) {
        menuRepository.deleteById(id);
    }
}
