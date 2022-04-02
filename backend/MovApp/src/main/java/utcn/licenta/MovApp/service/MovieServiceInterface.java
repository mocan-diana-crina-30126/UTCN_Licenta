package utcn.licenta.MovApp.service;

import org.apache.tika.mime.MimeTypeException;
import org.springframework.web.multipart.MultipartFile;
import utcn.licenta.MovApp.exception.MovieDuplicatedException;
import utcn.licenta.MovApp.exception.MovieNotFoundException;
import utcn.licenta.MovApp.model.Movie;

import java.util.List;

public interface MovieServiceInterface {

    List<Movie> getAllMovies();
    List<Movie> getPopularMovies();
    List<Movie> getTopRatedMovies();
    List<Movie> getUpcomingMovies();
    List<Movie> getTrendingMovies();
    List<Movie> getOriginalMovies();
    List<Movie> getMovieByTitle(String title);
    List<Movie> getMovieGenre(Integer id);

    Movie save(MultipartFile movie, String title, Integer year, Integer duration, String releaseDate, MultipartFile image) throws MovieDuplicatedException, MimeTypeException;

    Movie update(Movie movie) throws MovieNotFoundException;
    Integer delete(Integer id) throws MovieNotFoundException;

    List<Movie> getMovieByGenre(String genre);

}
