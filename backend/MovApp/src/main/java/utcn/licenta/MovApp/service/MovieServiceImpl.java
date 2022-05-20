package utcn.licenta.MovApp.service;

import org.apache.tika.mime.MimeTypeException;
import org.apache.tika.mime.MimeTypes;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import utcn.licenta.MovApp.dto.MovieDTO;
import utcn.licenta.MovApp.exception.InvalidFieldException;
import utcn.licenta.MovApp.exception.MovieNotFoundException;
import utcn.licenta.MovApp.model.Movie;
import utcn.licenta.MovApp.model.User;
import utcn.licenta.MovApp.repository.MovieRepository;
import utcn.licenta.MovApp.repository.UserRepository;
import utcn.licenta.MovApp.security.services.UserDetailsImpl;
import utcn.licenta.MovApp.service.converter.MovieConverter;
import utcn.licenta.MovApp.service.vlidator.LocalDateValidator;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class MovieServiceImpl implements MovieServiceInterface {


    private final MovieRepository movieRepository;
    private final UserRepository userRepository;
    private final MovieConverter movieConverter;
    private final LocalDateValidator localDateValidator;
    private static final String BASE_MOVIE_NAME = "D:\\LICENTA\\UTCN_Licenta\\FE\\MovApp-frontend\\src\\assets\\videos\\";
    private String BASE_IMAGE_NAME = "D:\\LICENTA\\UTCN_Licenta\\FE\\MovApp-frontend\\src\\assets\\images\\";
    private static final MimeTypes ALL_TYPES = MimeTypes.getDefaultMimeTypes();

    public MovieServiceImpl(MovieRepository movieRepository, UserRepository userRepository, MovieConverter movieConverter, LocalDateValidator localDateValidator) {
        this.movieRepository = movieRepository;
        this.userRepository = userRepository;
        this.movieConverter = movieConverter;
        this.localDateValidator = localDateValidator;
    }

    public Collection<MovieDTO> getAllMovies() {
        List<Movie> list = movieRepository.getAllMovies();

        return movieConverter.convertAll(list);
    }


    @Override
    public Collection<MovieDTO> getPopularMovies() {

        ///in functie de popularitate (popularitate intre 0-10)
        ///ordonare descrescatoare

        List<Movie> list = movieRepository.getPopulars();
        return movieConverter.convertAll(list);
    }


    @Override
    public Collection<MovieDTO> getTopRatedMovies() {
//        List<Movie> list = movieRepository.getAllMovies();
//        for(Movie movie : list){
//            if(movie.getImdb_rating() < 5){
//                list.remove(movie);
//            }
//        }
//        return list;

        List<Movie> movies = movieRepository.getTopRated();
        return movieConverter.convertAll(movies);
    }

    @Override
    public Collection<MovieDTO> getUpcomingMovies() {

        ///adaugare filme cu data mai mare decat data actuala

        List<Movie> movies = movieRepository.getUpcoming();
        return movieConverter.convertAll(movies);
    }

    @Override
    public Collection<MovieDTO> getTrendingMovies() {
        List<Movie> movies = movieRepository.getTrending();
        return movieConverter.convertAll(movies);
    }

    @Override
    public Collection<MovieDTO> getOriginalMovies() {
        List<Movie> movies = movieRepository.getOriginals();
        return movieConverter.convertAll(movies);
    }

    @Override
    public Collection<MovieDTO> getMovieByTitle(String title) {
        title = "%" + title + "%";
        return movieConverter.convertAll(movieRepository.getAllMoviesByTitle(title));


    }

    @Override
    public List<Movie> getMovieByGenre(String genre) {
        return movieRepository.getAllMoviesByGenre(genre);
    }

    @Override
    public Optional<Movie> getMovieById(Integer movieId) {
        return movieRepository.findById(movieId);
    }

    @Override
    public Collection<Movie> getAllFavoritesMovies(Long userId) {
        User user = movieRepository.findAllFavoritesByUserId(userId);
        return user == null ? Collections.emptyList() : user.getFavorites();
    }

    @Override
    public Collection<Movie> getAllWatchLaterMovies(Long userId) {
        User user = movieRepository.findAllWatchLaterByUserId(userId);
        return user == null ? Collections.emptyList() : user.getWatchLater();
    }

    @Override
    public Collection<MovieDTO> getMovieGenre(Integer id) {
        return movieConverter.convertAll(movieRepository.getMovieGenre(id));
    }

    @Override
    public List<String> getMovieContent(Integer id) {
        return movieRepository.getMovieContent(id);
    }


    @Override
    @Transactional
    public MovieDTO save(MultipartFile movie, MultipartFile image, String title, Integer duration, String releaseDate,
                         String content, String language, Integer directorId, Integer imdbRating, String overview, Integer popularity)
            throws MimeTypeException, InvalidFieldException {
        // TODO: 12.05.2022 Add validation for the fields
        Path path = Paths.get(BASE_MOVIE_NAME + movie.getOriginalFilename());
        Path imagePath = Paths.get(BASE_IMAGE_NAME + image.getOriginalFilename());

        try {
            Files.write(path, movie.getBytes());
            Files.write(imagePath, image.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        Movie movieEntity = new Movie();
        movieEntity.setTitle(title);
        movieEntity.setDuration(duration);
        movieEntity.setImage_path(image.getOriginalFilename());
        if (localDateValidator.isValid(releaseDate)) {
            movieEntity.setRelease_date(LocalDate.parse(releaseDate));
        } else {
            throw new InvalidFieldException("Invalid release date: " + releaseDate);
        }
        movieEntity.setContent(movie.getOriginalFilename());
        //movieEntity.setContent(content);
        movieEntity.setLanguage(language);
        movieEntity.setImdb_rating(imdbRating);
        movieEntity.setOverview(overview);
        movieEntity.setPopularity(popularity);


        return movieConverter.convertEntityToDTO(movieRepository.save(movieEntity));
    }

    @Override
    public MovieDTO update(Integer movieId, MultipartFile movie, MultipartFile image, String title, Integer duration,
                           String releaseDate, String content, String language, Integer directorId, Integer imdbRating,
                           String overview, Integer popularity)
            throws MovieNotFoundException, MimeTypeException, InvalidFieldException {
        Movie existingMovie = movieRepository.findById(movieId).orElseThrow(() -> new MovieNotFoundException(movieId));

        if (null != movie) {
            Path moviePath = Paths.get(BASE_MOVIE_NAME + movie.getName() + ALL_TYPES.forName(movie.getContentType()).getExtension());
            try {
                Files.write(moviePath, movie.getBytes(), StandardOpenOption.CREATE);
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        if (null != image) {
            Path imagePath = Paths.get(BASE_IMAGE_NAME + image.getName() + ALL_TYPES.forName(image.getContentType()).getExtension());
            try {
                Files.write(imagePath, image.getBytes(), StandardOpenOption.CREATE);
            } catch (IOException e) {
                e.printStackTrace();
            }
            existingMovie.setImage_path(image.getName() + ".jpeg"); // TODO: 20.05.2022 add custom types
        }

        if (null != title) {
            existingMovie.setTitle(title);
        }

        if (null != duration) {
            existingMovie.setDuration(duration);
        }

        if (localDateValidator.isValid(releaseDate)) {
            existingMovie.setRelease_date(LocalDate.parse(releaseDate));
        } else {
            throw new InvalidFieldException("Invalid release date: " + releaseDate);
        }

        if (null != content) {
            existingMovie.setContent(content);
        }

        if (null != language) {
            existingMovie.setLanguage(language);
        }

        if (null != imdbRating) {
            existingMovie.setImdb_rating(imdbRating);
        }

        if (null != overview) {
            existingMovie.setOverview(overview);
        }

        if (null != popularity) {
            existingMovie.setPopularity(popularity);
        }

        Movie updatedMovie = movieRepository.save(existingMovie);

        return movieConverter.convertEntityToDTO(updatedMovie);
    }

    @Override
    public void deleteMovieById(Integer id) throws MovieNotFoundException {
        Movie movieFromDb = movieRepository.findById(id).orElse(null);
        if (movieFromDb == null) {
            throw new MovieNotFoundException(id);
        }
        List<User> users = movieRepository.findAllUsersThatHaveMovieAsFavorite(id);
        users.forEach(user -> user.getFavorites().stream()
                .filter(movie -> movie.getId().equals(id))
                .findFirst()
                .ifPresent(movie -> user.getFavorites().remove(movie)));

        userRepository.saveAll(users);
        List<User> usersWL = movieRepository.findAllUsersThatHaveMovieAsWatchLater(id);
        usersWL.forEach(user -> user.getWatchLater().stream()
                .filter(movie -> movie.getId().equals(id))
                .findFirst()
                .ifPresent(movie -> user.getWatchLater().remove(movie)));
        userRepository.saveAll(usersWL);
        movieRepository.delete(movieFromDb);
    }


}
