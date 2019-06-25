package com.andreskonrad.koni.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.nio.file.Files;
import java.util.stream.Collectors;

public class IO {

    public static String readFileFromResources(String fileName) {

       try {
           InputStream resource = new ClassPathResource("werwoerter/kotnames.txt").getInputStream();
           try ( BufferedReader reader = new BufferedReader(
                   new InputStreamReader(resource)) ) {

               return reader.lines()
                       .collect(Collectors.joining("\n"));
           }
           //ClassLoader classLoader = IO.class.getClassLoader();
           //URL resource = classLoader.getResourceAsStream("werwoerter/kotnames.txt").;
           //System.out.println(resource.getPath());
           //File file = new File(resource.getFile());

           //return new String(Files.readAllBytes(file.toPath()));

       } catch (Exception e) {
           e.printStackTrace();
            return "";
       }

    }


}
