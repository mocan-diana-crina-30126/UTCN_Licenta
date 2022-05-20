package utcn.licenta.MovApp.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utcn.licenta.MovApp.dto.MovieDTO;
import utcn.licenta.MovApp.service.FavoritesServiceInterface;

import java.util.Collection;


@CrossOrigin
@RestController
@RequestMapping("/favorites")
public class FavoritesListController {
    private final FavoritesServiceInterface service;

    public FavoritesListController(FavoritesServiceInterface service) {
        this.service = service;
    }

    @PostMapping()
    public ResponseEntity<Void> addToFavorites(@RequestBody Integer movieId) {
        service.addMovieToFavorites(movieId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<Collection<MovieDTO>> getAllFavoritesMovies() {
        Collection<MovieDTO> allFavoritesMovie = service.getAllFavoritesMovies();
        return ResponseEntity.ok(allFavoritesMovie);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMovieFromFavorites(@PathVariable("id") Integer movieId) {
        service.deleteMovieFromFavorites(movieId);
        return ResponseEntity.noContent().build();
    }
}
