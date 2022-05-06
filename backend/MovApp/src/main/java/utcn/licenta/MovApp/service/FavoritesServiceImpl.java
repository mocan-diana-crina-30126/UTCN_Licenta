package utcn.licenta.MovApp.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utcn.licenta.MovApp.dto.MovieDTO;
import utcn.licenta.MovApp.model.Movie;
import utcn.licenta.MovApp.model.User;
import utcn.licenta.MovApp.repository.UserRepository;
import utcn.licenta.MovApp.security.services.UserDetailsImpl;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoritesServiceImpl implements FavoritesServiceInterface {


    private final MovieServiceInterface movieService;
    private final UserRepository userRepository;
    private final MovieConverter movieConverter;

    public FavoritesServiceImpl(MovieServiceInterface movieService, UserRepository userRepository, MovieConverter movieConverter) {
        this.movieService = movieService;
        this.userRepository = userRepository;
        this.movieConverter = movieConverter;
    }


    @Override
    @Transactional
    public void addMovieToFavorites(Integer movieId) {
        // aici ai luat userul care o facut request-ul
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        // aici ai verificat si ai luat din db userul care are id-ul userului care o facut request-ul
        User existingUser = userRepository.getById(principal.getId());

        //aici ai vericat in db ca movie-ul cu id-ul: movieId exista si l-ai luat, daca nu arunci exceptie
        Movie existingMovie = movieService.getMovieById(movieId).orElseThrow();

        // aici setezi pe userul existent filmul ca si favorit adaugand-ul la lista de favorite
        existingUser.addFavoriteMovie(existingMovie);

        //userRepository.save(existingUser);
    }

    @Override
    public Collection<MovieDTO> getAllFavoritesMovies() {
        // aici ai luat userul care o facut request-ul
        UserDetailsImpl principal = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Collection<MovieDTO> allFavoriteMovies = movieService.getAllFavoritesMovies(principal.getId());
        return allFavoriteMovies;
    }
}
