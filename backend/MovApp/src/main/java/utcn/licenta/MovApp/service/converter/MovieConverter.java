package utcn.licenta.MovApp.service.converter;

import org.springframework.stereotype.Component;
import utcn.licenta.MovApp.dto.MovieDTO;
import utcn.licenta.MovApp.model.Movie;

import java.util.Collection;
import java.util.stream.Collectors;

@Component
public class MovieConverter {

    public MovieDTO convertEntityToDTO(Movie movie) {

        MovieDTO movieDTO = new MovieDTO();
        movieDTO.setId(movie.getId());
        movieDTO.setImdb_rating(movie.getImdb_rating());
        movieDTO.setRelease_date(movie.getRelease_date());
        movieDTO.setOverview(movie.getOverview());
        movieDTO.setDuration(movie.getDuration());
        movieDTO.setImage_path(movie.getImage_path());
        movieDTO.setContent(movie.getContent());
        movieDTO.setTitle(movie.getTitle());
        movieDTO.setPopularity(movie.getPopularity());

        return movieDTO;
    }

    public Collection<MovieDTO> convertAll(Collection<Movie> movies) {
        return movies.stream().map(this::convertEntityToDTO).collect(Collectors.toList());
    }
}
