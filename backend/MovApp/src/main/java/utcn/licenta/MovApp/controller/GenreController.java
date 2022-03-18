package utcn.licenta.MovApp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import utcn.licenta.MovApp.model.Genre;
import utcn.licenta.MovApp.model.Movie;
import utcn.licenta.MovApp.service.GenreServiceImpl;
import utcn.licenta.MovApp.service.MovieServiceImpl;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/genres")
public class GenreController {

   @Autowired
    private GenreServiceImpl genreService;

   @Autowired
   private MovieServiceImpl movieService;

   @GetMapping("/all")
   public List<Genre> getAllGenres(){
       return genreService.getAllGenres();
   }

//    @GetMapping("/{id}")
//    public List<Genre> getGenre(@PathVariable("id") Integer id) {
//
//        return genreService.getGenre(id);
//    }

        @GetMapping("/{id}")
    public List<Movie> getMovieGenre(@PathVariable("id") Integer id) {

        return movieService.getMovieGenre(id);
    }


}
