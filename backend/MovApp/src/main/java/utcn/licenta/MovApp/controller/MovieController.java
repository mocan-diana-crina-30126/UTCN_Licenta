package utcn.licenta.MovApp.controller;


import org.apache.tika.mime.MimeTypeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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

    @GetMapping("/all")
    public List<Movie> getAllMovies() {

        return movieService.getAllMovies();
    }

    @GetMapping("/{id}")
    public List<Movie> getMovieInfo(@PathVariable("id") Integer id) {

        return movieService.getMovieInfo(id);
    }

    @GetMapping("/top_rated")
    public List<Movie> getTopRatedMovies() {
        return movieService.getTopRatedMovies();
    }

    @GetMapping("/popular")
    public List<Movie> getPopularMovies() {
        return movieService.getPopularMovies();
    }

    @GetMapping("/latest")
    public List<Movie> getLatestMovies() {
        return movieService.getLatestMovies();
    }

    @GetMapping("/search")
    public List<Movie> getMovieByTitle(@RequestParam(required = false) String title, @RequestParam(required = false) String genre) {
        if (genre != null) {
            return movieService.getMovieByGenre(genre);
        } else {
            return movieService.getMovieByTitle(title);
        }
    }


    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    // TODO: 11/24/2021 Add all fields from Movie Dto
    public ResponseEntity<?> save(@RequestParam MultipartFile movie,
                                  @RequestParam MultipartFile image,
                                  @RequestParam(required = false) String title,
                                  @RequestParam(required = false) Integer year,
                                  @RequestParam(required = false) Integer duration,
                                  @RequestParam(required = false) String releaseDate) throws MovieDuplicatedException, MimeTypeException {
        if (movie == null) {  //daca filmul dat de utilizator este null
            return ResponseEntity.badRequest().body("The provided movie is not valid");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(movieService.save(movie, title, year, duration, releaseDate, image));
    }

    @PutMapping("/")
    public ResponseEntity<?> update(@RequestBody Movie movie) throws MovieNotFoundException {
        if (movie == null) {
            return ResponseEntity.badRequest().body("The provided movie is not valid");
        }
        return ResponseEntity.ok().body(movieService.update(movie));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) throws MovieNotFoundException {
        if (id == null) {
            return ResponseEntity.badRequest().body("The provided movie's id is not valid");
        }
        return ResponseEntity.ok().body("Movie [" + movieService.delete(id) + "] deleted successfully");
    }


}
