package utcn.licenta.MovApp.service;

import org.apache.tika.mime.MimeTypeException;
import org.springframework.web.multipart.MultipartFile;
import utcn.licenta.MovApp.dto.MovieDTO;
import utcn.licenta.MovApp.exception.MovieDuplicatedException;
import utcn.licenta.MovApp.exception.MovieNotFoundException;
import utcn.licenta.MovApp.model.Movie;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface MovieServiceInterface {

    Collection<MovieDTO> getAllMovies();
    Collection<MovieDTO> getPopularMovies();
    Collection<MovieDTO> getTopRatedMovies();
    Collection<MovieDTO> getUpcomingMovies();
    Collection<MovieDTO> getTrendingMovies();
    Collection<MovieDTO> getOriginalMovies();
    Collection<MovieDTO> getMovieByTitle(String title);
    Collection<MovieDTO> getMovieGenre(Integer id);
    String getMovieContent(Integer id);

    Movie save(MultipartFile movie, String title, Integer year, Integer duration, String releaseDate, MultipartFile image) throws MovieDuplicatedException, MimeTypeException;

    Movie update(Movie movie) throws MovieNotFoundException;
    Integer delete(Integer id) throws MovieNotFoundException;

    List<Movie> getMovieByGenre(String genre);

    Optional<Movie> getMovieById(Integer movieId);

    Collection<MovieDTO> getAllFavoritesMovies(Long userId);
}
