package utcn.licenta.MovApp.service;

import utcn.licenta.MovApp.dto.MovieDTO;

import java.util.Collection;

public interface WatchLaterServiceInterface {
    void addMovieToWatchLater(Integer movieId);

    Collection<MovieDTO> getAllWatchLaterMovies();

    void deleteMovieFromWatchLater(Integer movieId);
}
