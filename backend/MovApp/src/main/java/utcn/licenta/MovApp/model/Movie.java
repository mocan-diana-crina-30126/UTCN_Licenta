package utcn.licenta.MovApp.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "movies")
public class Movie {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Integer id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "duration", nullable = false)
    private Integer duration;

    @Column(name = "release_date", nullable = false)
    private LocalDate release_date;

    @Column(name = "image_path", nullable = false, length = 255)
    private String image_path;

    @Column(name = "overview", nullable = true, length = 255)
    private String overview;

    @Column(name = "imdb_rating", nullable = false)
    private Integer imdb_rating;

    @Column(name = "language", nullable = true)
    private String language;

    @Column(name = "content", nullable = false, length = 255)
    private String content;

    @Column(name = "popularity", nullable = false)
    private Integer popularity;

    @ManyToMany(cascade = CascadeType.PERSIST, fetch = FetchType.LAZY)
    @JoinTable(name = "movie_genre", joinColumns = @JoinColumn(name = "movie_id"), inverseJoinColumns = @JoinColumn(name = "genre_id"))
    private List<Genre> genres = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "favorites")
    private List<User> UsersTHatHaveThisToFavorites = new ArrayList<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "watchLater")
    private List<User> UsersThatHaveThisToWatchLater = new ArrayList<>();

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getPopularity() {
        return popularity;
    }

    public void setPopularity(Integer popularity) {
        this.popularity = popularity;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public LocalDate getRelease_date() {
        return release_date;
    }

    public void setRelease_date(LocalDate release_date) {
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

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Genre> getGenres() {
        return genres;
    }

    public void setGenres(List<Genre> genres) {
        this.genres = genres;
    }

    public List<User> getUsersTHatHaveThisToFavorites() {
        return UsersTHatHaveThisToFavorites;
    }

    public void setUsersTHatHaveThisToFavorites(List<User> usersTHatHaveThisToFavorites) {
        UsersTHatHaveThisToFavorites = usersTHatHaveThisToFavorites;
    }

    public List<User> getUsersThatHaveThisToWatchLater() {
        return UsersThatHaveThisToWatchLater;
    }

    public void setUsersThatHaveThisToWatchLater(List<User> usersThatHaveThisToWatchLater) {
        UsersThatHaveThisToWatchLater = usersThatHaveThisToWatchLater;
    }
}
