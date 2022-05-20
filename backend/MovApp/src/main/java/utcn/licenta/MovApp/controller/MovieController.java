package utcn.licenta.MovApp.controller;


import org.apache.tika.mime.MimeTypeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import utcn.licenta.MovApp.dto.MovieDTO;
import utcn.licenta.MovApp.exception.InvalidFieldException;
import utcn.licenta.MovApp.exception.MovieNotFoundException;
import utcn.licenta.MovApp.model.Movie;
import utcn.licenta.MovApp.security.authorization.HasAdminRole;
import utcn.licenta.MovApp.service.MovieServiceImpl;

import java.util.Collection;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/movies")
public class MovieController {

    @Autowired
    private MovieServiceImpl movieService;

    @GetMapping("/all")
    public Collection<MovieDTO> getAllMovies() {

        return movieService.getAllMovies();
    }

//    @GetMapping("/{id}")
//    public List<Movie> getMovie(@PathVariable("id") Integer id) {
//
//        return movieService.getMovie(id);
//    }

    @GetMapping("/trending")
    public Collection<MovieDTO> getTrendingMovies() {
        return movieService.getTrendingMovies();
    }

    @GetMapping("/top_rated")
    public Collection<MovieDTO> getTopRatedMovies() {
        return movieService.getTopRatedMovies();
    }

    @GetMapping("/originals")
    public Collection<MovieDTO> getOriginalMovies() {
        return movieService.getOriginalMovies();
    }

    @GetMapping("/populars")
    public Collection<MovieDTO> getPopularMovies() {
        return movieService.getPopularMovies();
    }

    @GetMapping("/upcoming")
    public Collection<MovieDTO> getUpcomingMovies() {
        return movieService.getUpcomingMovies();
    }

    @GetMapping("/search")
    public Collection<MovieDTO> getMovieByTitle(@RequestParam(required = false) String title) {
        return movieService.getMovieByTitle(title);
    }

    @GetMapping("/video/{id}")
    public List<String> getMovieContent(@PathVariable("id") Integer id) {

        return movieService.getMovieContent(id);
    }


    @HasAdminRole
    @PostMapping(value = "", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> save(@RequestParam MultipartFile movie,
                                  @RequestParam MultipartFile image,
                                  @RequestParam(required = false) String title,
                                  @RequestParam(required = false) Integer duration,
                                  @RequestParam(required = false) String release_date,
                                  @RequestParam(required = false) String content,
                                  @RequestParam(required = false) Integer languageId,
                                  @RequestParam(required = false) Integer directorId,
                                  @RequestParam(required = false) Integer imdbRating,
                                  @RequestParam(required = false) String overview) throws MimeTypeException, InvalidFieldException {
        MovieDTO createdMovie = movieService.save(movie, image, title, duration, release_date, content, languageId,
                directorId, imdbRating, overview);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMovie);// TODO: 12.05.2022 create uri
    }

    @HasAdminRole
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> update(@PathVariable("id") Integer movieId,
                                    @RequestParam(required = false) MultipartFile movie,
                                    @RequestParam(required = false) MultipartFile image,
                                    @RequestParam(required = false) String title,
                                    @RequestParam(required = false) Integer duration,
                                    @RequestParam(required = false) String release_date,
                                    @RequestParam(required = false) String content,
                                    @RequestParam(required = false) String language,
                                    @RequestParam(required = false) Integer directorId,
                                    @RequestParam(required = false) Integer imdbRating,
                                    @RequestParam(required = false) String overview)
            throws MimeTypeException, InvalidFieldException, MovieNotFoundException {

        MovieDTO createdMovie = movieService.update(movieId, movie, image, title, duration, release_date, content, language,
                directorId, imdbRating, overview);

        return ResponseEntity.ok(createdMovie);
    }

    @HasAdminRole
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Integer movieId) throws MovieNotFoundException {
        if (movieId == null) {
            return ResponseEntity.badRequest().body("The provided movie's id is not valid");
        }

        movieService.deleteMovieById(movieId);

        return ResponseEntity.noContent().build();
    }


}
