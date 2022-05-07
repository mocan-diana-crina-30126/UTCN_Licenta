package utcn.licenta.MovApp.service;

import org.apache.tika.mime.MimeTypeException;
import org.apache.tika.mime.MimeTypes;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import utcn.licenta.MovApp.dto.MovieDTO;
import utcn.licenta.MovApp.exception.MovieDuplicatedException;
import utcn.licenta.MovApp.exception.MovieNotFoundException;
import utcn.licenta.MovApp.model.Movie;
import utcn.licenta.MovApp.model.User;
import utcn.licenta.MovApp.repository.MovieRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;

import utcn.licenta.MovApp.service.converter.MovieConverter;

@Service
public class MovieServiceImpl implements MovieServiceInterface {


    private final MovieRepository movieRepository;
    private final MovieConverter movieConverter;
    private static final String BASE_MOVIE_NAME = "D:\\LICENTA\\UTCN_Licenta\\FE\\MovApp-frontend\\src\\assets\\videos\\";
    private String BASE_IMAGE_NAME = "D:\\LICENTA\\UTCN_Licenta\\FE\\MovApp-frontend\\src\\assets\\images\\";
    private static final MimeTypes ALL_TYPES = MimeTypes.getDefaultMimeTypes();

    public MovieServiceImpl(MovieRepository movieRepository, MovieConverter movieConverter) {
        this.movieRepository = movieRepository;
        this.movieConverter = movieConverter;
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
    public Collection<MovieDTO> getMovieGenre(Integer id) {
        return movieConverter.convertAll(movieRepository.getMovieGenre(id));
    }

    @Override
    public List<String> getMovieContent(Integer id) {
        return movieRepository.getMovieContent(id);
    }


    @Override
    public Movie save(MultipartFile movie, String title, Integer year, Integer duration, String releaseDate, MultipartFile image) throws MovieDuplicatedException, MimeTypeException {
        Path path = Paths.get(BASE_MOVIE_NAME + movie.getName() + ALL_TYPES.forName(movie.getContentType()).getExtension());
        Path imagePath = Paths.get(BASE_IMAGE_NAME + image.getName() + ALL_TYPES.forName(image.getContentType()).getExtension());

        try {
            Files.write(path, movie.getBytes());
            Files.write(imagePath, image.getBytes());
        } catch (IOException e) {
            e.printStackTrace();
        }

        Movie movieEntity = new Movie();
        movieEntity.setTitle(title);
        movieEntity.setDuration(duration);
        movieEntity.setImage_path(image.getName() + ".jpeg");
        movieEntity.setRelease_date(LocalDate.now());
        movieEntity.setContent("some content");
        movieEntity.setLanguage_id(1);
        movieEntity.setDirector_id(1);
        movieEntity.setImdb_rating(1);
        movieEntity.setOverview("Some overview");

        return movieRepository.save(movieEntity);
    }

    @Override
    public Movie update(Movie movie) throws MovieNotFoundException {
        Movie movieFromDb = movieRepository.findById(movie.getId()).orElse(null);
        if (movieFromDb == null) {
            throw new MovieNotFoundException(movie.getId());
        }
        movie.setId(movieFromDb.getId());
        return movieRepository.save(movie);
    }

    @Override
    public Integer delete(Integer id) throws MovieNotFoundException {
        Movie movieFromDb = movieRepository.findById(id).orElse(null);
        if (movieFromDb == null) {
            throw new MovieNotFoundException(id);
        }
        movieRepository.delete(movieFromDb);
        return id;
    }


}
