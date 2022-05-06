package utcn.licenta.MovApp.service;

import utcn.licenta.MovApp.dto.MovieDTO;

import java.util.Collection;
import java.util.List;

public interface FavoritesServiceInterface {

    void addMovieToFavorites(Integer movieId);

    Collection<MovieDTO> getAllFavoritesMovies();
}
