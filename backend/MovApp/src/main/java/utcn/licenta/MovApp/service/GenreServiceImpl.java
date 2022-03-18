package utcn.licenta.MovApp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utcn.licenta.MovApp.model.Genre;
import utcn.licenta.MovApp.repository.GenreRepository;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreServiceInterface{

    @Autowired
    private GenreRepository genreRepository;

    @Override
    public List<Genre> getAllGenres() {
        List<Genre> list = genreRepository.getAllGenres();
        return list;
    }

    @Override
    public List<Genre> getGenre(Integer id) {
        List<Genre> genre = genreRepository.getGenre();
        return genre;
    }


}
