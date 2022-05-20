package utcn.licenta.MovApp.repository;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import utcn.licenta.MovApp.model.Children;
import utcn.licenta.MovApp.model.Movie;

import java.util.List;

public interface ChildrenRepository extends JpaRepository<Children, Integer> {

    @Query("SELECT c FROM Children c")
    List<Children> getAllCartoons();

    @Query("SELECT c FROM Children c")
    List<Children> sortDesc(Sort sort);


    @Query("select movie.content from Children movie " +
            "where movie.id = :id ")
    List<String> getCartoonContent(@Param("id") Integer id);


}
