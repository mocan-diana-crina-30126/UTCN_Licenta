package utcn.licenta.MovApp.service.converter;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import utcn.licenta.MovApp.dto.GenreDTO;
import utcn.licenta.MovApp.model.Genre;

@Component
public class GenreConverter {

  public GenreDTO convert(Genre genre) {
    GenreDTO genreDTO = new GenreDTO();
    genreDTO.setGenre_id(genre.getId());
    genreDTO.setGenre_name(genre.getName());
    return genreDTO;
  }

  public List<GenreDTO> convertAll(List<Genre> genres) {
    return genres.stream().map(this::convert).collect(Collectors.toList());
  }
}
