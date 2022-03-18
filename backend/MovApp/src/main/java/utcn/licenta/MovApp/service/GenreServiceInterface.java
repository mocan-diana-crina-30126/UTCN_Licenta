package utcn.licenta.MovApp.service;

import utcn.licenta.MovApp.model.Genre;

import java.util.List;

public interface GenreServiceInterface {

    List<Genre> getAllGenres();
    List<Genre> getGenre(Integer id);
}
