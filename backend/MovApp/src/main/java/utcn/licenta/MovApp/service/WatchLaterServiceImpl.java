package utcn.licenta.MovApp.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utcn.licenta.MovApp.dto.MovieDTO;
import utcn.licenta.MovApp.model.Movie;
import utcn.licenta.MovApp.model.User;
import utcn.licenta.MovApp.repository.MovieRepository;
import utcn.licenta.MovApp.repository.UserRepository;
import utcn.licenta.MovApp.security.services.UserDetailsImpl;
import utcn.licenta.MovApp.service.converter.MovieConverter;

import java.util.Collection;

@Service
public class WatchLaterServiceImpl implements WatchLaterServiceInterface{

    private final UserRepository userRepository;
    private final MovieRepository movieRepository;
    private final MovieServiceInterface movieService;
    private final MovieConverter movieConverter;

    public WatchLaterServiceImpl(UserRepository userRepository, MovieRepository movieRepository, MovieServiceInterface movieService, MovieConverter movieConverter) {
        this.userRepository = userRepository;
        this.movieRepository = movieRepository;
        this.movieService = movieService;
        this.movieConverter = movieConverter;
    }


    @Override
    @Transactional
    public void addMovieToWatchLater(Integer movieId) {

        //preluarea userului care a facut requestul in principal
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        //verificare + preluare din baza de date user care are id-ul userului care a facut requetul

        User existingUser = userRepository.getById(principal.getId());

        //verific faca movie-ul cu id-ul movieId exista si il iau, daca nu arunc exceptie

        Movie existingMovie = movieService.getMovieById(movieId).orElseThrow();

        //setez pe userul existent filmul care urmeaza a fi vazut mai tarziu adaugandu-l la lista de vizionare mai tarziu
        existingUser.addWatchLaterMovie(existingMovie);

    }

    @Override
    public Collection<MovieDTO> getAllWatchLaterMovies() {

        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<Movie> allWatchLaterMovies = movieService.getAllWatchLaterMovies(principal.getId());
        return movieConverter.convertAll(allWatchLaterMovies);

    }
}
