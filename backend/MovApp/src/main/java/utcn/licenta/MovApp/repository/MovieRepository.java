package utcn.licenta.MovApp.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import utcn.licenta.MovApp.model.Movie;

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
            "join movie.genres genres " +
            "where genres.name = :genre " +
            "order by movie.title asc")
    List<Movie> getAllMoviesByGenre(@Param("genre") String genre);
}
