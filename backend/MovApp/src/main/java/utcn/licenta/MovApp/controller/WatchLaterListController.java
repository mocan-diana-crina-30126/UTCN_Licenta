package utcn.licenta.MovApp.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utcn.licenta.MovApp.dto.MovieDTO;
import utcn.licenta.MovApp.service.WatchLaterServiceInterface;

import java.util.Collection;

@CrossOrigin
@RestController
@RequestMapping("/watch")
public class WatchLaterListController {

    private final WatchLaterServiceInterface service;

    public WatchLaterListController(WatchLaterServiceInterface service) {
        this.service = service;
    }

    @PostMapping()
    public ResponseEntity<Void> addToWatchLater(@RequestBody Integer movieId){
        service.addMovieToWatchLater(movieId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/all")
    public ResponseEntity<Collection<MovieDTO>> getAllWatchLaterMovies(){
        Collection<MovieDTO> allWatchLaterMovies = service.getAllWatchLaterMovies();
        return ResponseEntity.ok(allWatchLaterMovies);
    }

}
