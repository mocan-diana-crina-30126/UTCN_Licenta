package utcn.licenta.MovApp.service;

import org.apache.tika.mime.MimeTypeException;
import org.springframework.web.multipart.MultipartFile;
import utcn.licenta.MovApp.dto.MovieDTO;
import utcn.licenta.MovApp.exception.InvalidFieldException;
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

    List<String> getMovieContent(Integer id);

    MovieDTO save(MultipartFile movie, MultipartFile image, String title, Integer duration, String releaseDate,
                  String content, String language, Integer directorId, Integer imdbRating,
                  String overview, Integer popularity) throws InvalidFieldException;

    void deleteMovieById(Integer id) throws MovieNotFoundException;

    List<Movie> getMovieByGenre(String genre);

    Optional<Movie> getMovieById(Integer movieId);

    Collection<Movie> getAllFavoritesMovies(Long userId);

    Collection<Movie> getAllWatchLaterMovies(Long id);

    MovieDTO update(Integer movieId, MultipartFile movie, MultipartFile image, String title, Integer duration, String releaseDate, String content, String language, Integer directorId, Integer imdbRating, String overview, Integer popularity) throws MovieNotFoundException, MimeTypeException, InvalidFieldException;
}
