package utcn.licenta.MovApp.service;

import org.springframework.stereotype.Service;
import utcn.licenta.MovApp.dto.GenreDTO;
import utcn.licenta.MovApp.model.Genre;
import utcn.licenta.MovApp.repository.GenreRepository;
import utcn.licenta.MovApp.service.converter.GenreConverter;

import java.util.List;

@Service
public class GenreServiceImpl implements GenreServiceInterface {


    private final GenreRepository genreRepository;
    private final GenreConverter genreConverter;

    public GenreServiceImpl(GenreRepository genreRepository, GenreConverter genreConverter) {
        this.genreRepository = genreRepository;
        this.genreConverter = genreConverter;
    }

    @Override
    public List<GenreDTO> getAllGenres() {
        List<Genre> list = genreRepository.getAllGenres();
        return genreConverter.convertAll(list);
    }

    @Override
    public List<Genre> getGenre(Integer id) {
        return genreRepository.getGenre();
    }


}
