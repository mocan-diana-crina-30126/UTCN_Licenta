package utcn.licenta.MovApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import utcn.licenta.MovApp.model.Genre;

import java.util.List;

public interface GenreRepository extends JpaRepository<Genre, Integer> {

    @Query("SELECT g FROM Genre g")
    List<Genre> getAllGenres();

    @Query("SELECT g FROM Genre g WHERE g.id = :id")
    List<Genre> getGenre();

}
