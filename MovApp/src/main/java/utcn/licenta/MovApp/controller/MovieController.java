package utcn.licenta.MovApp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utcn.licenta.MovApp.exception.MovieDuplicatedException;
import utcn.licenta.MovApp.exception.MovieNotFoundException;
import utcn.licenta.MovApp.model.Movie;
import utcn.licenta.MovApp.service.MovieServiceImpl;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieServiceImpl movieService;

    @GetMapping("/")
    public List<Movie> getAllMovies(){
        return movieService.getAllMovies();
    }

    @PostMapping("/")
    public ResponseEntity<?> save(@RequestBody Movie movie) throws MovieDuplicatedException{
        if(movie == null){  //daca filmul dat de utilizator este null
            return ResponseEntity.badRequest().body("The provided movie is not valid");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(movieService.save(movie));
    }

    @PutMapping("/")
    public ResponseEntity<?> update(@RequestBody Movie movie) throws MovieNotFoundException{
        if(movie == null){
            return ResponseEntity.badRequest().body("The provided movie is not valid");
        }
        return ResponseEntity.ok().body(movieService.update(movie));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) throws MovieNotFoundException{
        if(id == null){
            return ResponseEntity.badRequest().body("The provided movie's id is not valid");
        }
        return ResponseEntity.ok().body("Movie [" + movieService.delete(id) + "] deleted successfully");
    }
}
