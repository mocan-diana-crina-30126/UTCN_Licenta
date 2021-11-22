package utcn.licenta.MovApp.service;

import utcn.licenta.MovApp.exception.MovieDuplicatedException;
import utcn.licenta.MovApp.exception.MovieNotFoundException;
import utcn.licenta.MovApp.model.Movie;

import java.util.List;

public interface MovieServiceInterface {

    List<Movie> getAllMovies();
    Movie save(Movie movie) throws MovieDuplicatedException;
    Movie update(Movie movie) throws MovieNotFoundException;
    Integer delete(Integer id) throws MovieNotFoundException;

}
