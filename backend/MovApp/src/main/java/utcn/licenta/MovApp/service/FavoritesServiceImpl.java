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
public class FavoritesServiceImpl implements FavoritesServiceInterface {


    private final MovieServiceInterface movieService;
    private final UserRepository userRepository;
    private final MovieConverter movieConverter;

    private final MovieRepository movieRepository;

    public FavoritesServiceImpl(MovieServiceInterface movieService, UserRepository userRepository, MovieConverter movieConverter,
                                MovieRepository movieRepository) {
        this.movieService = movieService;
        this.userRepository = userRepository;
        this.movieConverter = movieConverter;
        this.movieRepository = movieRepository;
    }


    @Override
    @Transactional
    public void addMovieToFavorites(Integer movieId) {
        // aici am luat userul care a facut request-ul
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // aici am verificat si am luat din db userul care are id-ul userului care a facut request-ul
        User existingUser = userRepository.getById(principal.getId());

        //aici am vericat in db ca movie-ul cu id-ul: movieId exista si l-am luat, daca nu arunc exceptie
        Movie existingMovie = movieService.getMovieById(movieId).orElseThrow();

        // aici setez pe userul existent filmul ca si favorit adaugandu-l la lista de favorite

        existingUser.addFavoriteMovie(existingMovie);

        //userRepository.save(existingUser);
    }

    @Override
    public Collection<MovieDTO> getAllFavoritesMovies() {
        // aici ai luat userul care o facut request-ul
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<Movie> allFavoritesMovies = movieService.getAllFavoritesMovies(principal.getId());
        return movieConverter.convertAll(allFavoritesMovies);
    }

    @Transactional
    @Override
    public void deleteMovieFromFavorites(Integer movieId) {
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User loggedInUser = movieRepository.findAllFavoritesByUserId(principal.getId());
        if (loggedInUser != null) {
            Collection<Movie> allFavoriteMovies = loggedInUser.getFavorites();
            allFavoriteMovies.stream()
                    .filter(movie -> movie.getId().equals(movieId))
                    .findFirst()
                    .ifPresent(allFavoriteMovies::remove);
        }
    }
}
