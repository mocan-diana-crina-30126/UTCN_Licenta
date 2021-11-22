package utcn.licenta.MovApp.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Integer movie_id;

    @Column(name = "subtitle_id", nullable = false)
    private Integer subtitle_id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "year", nullable = false)
    private Integer year;

    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Column(name = "release_date", nullable = false)
    private Date release_date;

    @Column(name = "image_path", nullable = false, length = 255)
    private String image_path;

    @Column(name = "overview", nullable = false, length = 255)
    private String overview;

    @Column(name = "imdb_rating", nullable = false)
    private Integer imdb_rating;

    @Column(name = "language_id", nullable = false)
    private Integer language_id;

    @Column(name = "director_id", nullable = false)
    private Integer director_id;

    @Column(name = "content", nullable = false, length = 255)
    private String content;

    public Integer getMovie_id() {
        return movie_id;
    }

    public void setMovie_id(Integer movie_id) {
        this.movie_id = movie_id;
    }

    public Integer getSubtitle_id() {
        return subtitle_id;
    }

    public void setSubtitle_id(Integer subtitle_id) {
        this.subtitle_id = subtitle_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Date getRelease_date() {
        return release_date;
    }

    public void setRelease_date(Date release_date) {
        this.release_date = release_date;
    }

    public String getImage_path() {
        return image_path;
    }

    public void setImage_path(String image_path) {
        this.image_path = image_path;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public Integer getImdb_rating() {
        return imdb_rating;
    }

    public void setImdb_rating(Integer imdb_rating) {
        this.imdb_rating = imdb_rating;
    }

    public Integer getLanguage_id() {
        return language_id;
    }

    public void setLanguage_id(Integer language_id) {
        this.language_id = language_id;
    }

    public Integer getDirector_id() {
        return director_id;
    }

    public void setDirector_id(Integer director_id) {
        this.director_id = director_id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
