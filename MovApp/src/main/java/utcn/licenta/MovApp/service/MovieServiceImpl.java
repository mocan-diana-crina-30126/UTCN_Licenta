package utcn.licenta.MovApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utcn.licenta.MovApp.exception.MovieDuplicatedException;
import utcn.licenta.MovApp.exception.MovieNotFoundException;
import utcn.licenta.MovApp.model.Movie;
import utcn.licenta.MovApp.repository.MovieRepository;

import java.util.List;

@Service
public class MovieServiceImpl implements MovieServiceInterface{

    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies(){
        List<Movie> list =  movieRepository.getAllMovies();
        return list;
    }

    @Override
    public Movie save(Movie movie) throws MovieDuplicatedException {
       Movie movieFromDb = movieRepository.findById(movie.getMovie_id()).orElse(null);
       if(movieFromDb != null){
           throw new MovieDuplicatedException(movie.getMovie_id());
       }
       return movieRepository.save(movie);
    }

    @Override
    public Movie update(Movie movie) throws MovieNotFoundException {
        Movie movieFromDb = movieRepository.findById(movie.getMovie_id()).orElse(null);
        if(movieFromDb == null){
            throw new MovieNotFoundException(movie.getMovie_id());
        }
        movie.setMovie_id(movieFromDb.getMovie_id());
        return movieRepository.save(movie);
    }

    @Override
    public Integer delete(Integer id) throws MovieNotFoundException {
        Movie movieFromDb = movieRepository.findById(id).orElse(null);
        if(movieFromDb == null){
            throw new MovieNotFoundException(id);
        }
        movieRepository.delete(movieFromDb);
        return id;
    }

}
