package utcn.licenta.MovApp.service;

import org.apache.tika.mime.MimeTypeException;
import org.apache.tika.mime.MimeTypes;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import utcn.licenta.MovApp.exception.MovieDuplicatedException;
import utcn.licenta.MovApp.exception.MovieNotFoundException;
import utcn.licenta.MovApp.model.Movie;
import utcn.licenta.MovApp.repository.MovieRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.*;

@Service
public class MovieServiceImpl implements MovieServiceInterface {

    @Autowired
    private MovieRepository movieRepository;
    private static final String BASE_MOVIE_NAME = "D:\\LICENTA\\UTCN_Licenta\\FE\\MovApp-frontend\\src\\assets\\videos\\";
    private String BASE_IMAGE_NAME = "D:\\LICENTA\\UTCN_Licenta\\FE\\MovApp-frontend\\src\\assets\\images\\";
    private static final MimeTypes ALL_TYPES = MimeTypes.getDefaultMimeTypes();

    public List<Movie> getAllMovies() {
        List<Movie> list = movieRepository.getAllMovies();
        return list;
    }




    @Override
    public List<Movie> getPopularMovies() {

        ///in functie de popularitate (popularitate intre 0-10)
        ///ordonare descrescatoare

        List<Movie> movies = movieRepository.getPopulars();
        return movies;
    }


    @Override
    public List<Movie> getTopRatedMovies() {
//        List<Movie> list = movieRepository.getAllMovies();
//        for(Movie movie : list){
//            if(movie.getImdb_rating() < 5){
//                list.remove(movie);
//            }
//        }
//        return list;

        List<Movie> movies = movieRepository.getTopRated();
        return movies;
    }

    @Override
    public List<Movie> getUpcomingMovies() {

        ///adaugare filme cu data mai mare decat data actuala

        List<Movie> movies = movieRepository.getUpcoming();
        return movies;
    }

    @Override
    public List<Movie> getTrendingMovies() {
        List<Movie> movies = movieRepository.getTrending();
        return movies;
    }

    @Override
    public List<Movie> getOriginalMovies() {
        List<Movie> movies = movieRepository.getOriginals();
        return movies;
    }

    @Override
    public List<Movie> getMovieByTitle(String title) {
        title = "%" + title + "%";
        return movieRepository.getAllMoviesByTitle(title);

    }

    @Override
    public List<Movie> getMovieByGenre(String genre) {
        return movieRepository.getAllMoviesByGenre(genre);
    }

   @Override
   public List<Movie> getMovieGenre(Integer id){
        return movieRepository.getMovieGenre(id);
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
