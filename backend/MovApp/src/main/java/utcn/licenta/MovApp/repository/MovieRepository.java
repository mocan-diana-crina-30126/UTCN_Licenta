package utcn.licenta.MovApp.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import utcn.licenta.MovApp.dto.MovieDTO;
import utcn.licenta.MovApp.model.Movie;
import utcn.licenta.MovApp.model.User;

import java.util.List;

public interface MovieRepository extends JpaRepository<Movie, Integer> {

    @Query("SELECT m FROM Movie m")
    List<Movie> getAllMovies();

    @Query("SELECT m FROM Movie m")
    List<Movie> sortDesc(Sort sort);

    @Query("select movie from Movie movie " +
            "where movie.title like :title " +
            "order by movie.title asc")
    List<Movie> getAllMoviesByTitle(@Param("title") String title);

    @Query("select movie from Movie movie " +
            "inner join movie.genres genres " +
            "where genres.name = :genre " +
            "order by movie.title asc")
    List<Movie> getAllMoviesByGenre(@Param("genre") String genre);

    @Query("select movie from Movie movie " +
            "join movie.genres genres " +
            "where genres.id = :id " +
            "order by movie.title asc")
    List<Movie> getMovieGenre(@Param("id") Integer id);


    @Query("select movie from Movie movie " +
            "where movie.imdb_rating >= 7 " +
            "order by movie.imdb_rating desc")
    List<Movie> getTopRated();

    @Query("select movie from Movie movie " +
            "where movie.release_date >= '2022-01-01' AND movie.release_date <='2022-04-01' " +
            "order by movie.release_date desc")
    List<Movie> getTrending();

    @Query("select movie from Movie movie " +
            "where movie.id IN (1,2,3,5,6,8,9,10,20,23)")
    List<Movie> getOriginals();

    @Query("select movie from Movie movie " +
            "where movie.popularity >= 15" +
            "order by movie.popularity desc")
    List<Movie> getPopulars();

    @Query("select movie from Movie movie " +
            "where movie.release_date >= '2022-10-01'" +
            "order by movie.title asc")
    List<Movie> getUpcoming();

    @Query("select movie.content from Movie movie " +
            "where movie.id = :id ")
    List<String> getMovieContent(@Param("id") Integer id);

    @Query("select user from User user " +
            "join fetch user.favorites " +
            "where user.id =:userId")
    User findAllFavoritesByUserId(@Param("userId") Long userId);


    @Query("select user from User user " +
            "join fetch user.watchLater " +
            "where user.id =:userId")
    User findAllWatchLaterByUserId(@Param("userId") Long userId);
}
