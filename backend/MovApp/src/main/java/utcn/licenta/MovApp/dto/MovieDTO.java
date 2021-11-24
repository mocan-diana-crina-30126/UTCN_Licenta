package utcn.licenta.MovApp.dto;

import java.util.Date;

public class MovieDTO {

   private String title;
   private Integer year;
   private Integer duration;
   private Date releaseDate;
   private String imagePath;
   private String overview;
   private Integer tmdbRating;
   private String contentName;

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

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getOverview() {
        return overview;
    }

    public void setOverview(String overview) {
        this.overview = overview;
    }

    public Integer getTmdbRating() {
        return tmdbRating;
    }

    public void setTmdbRating(Integer tmdbRating) {
        this.tmdbRating = tmdbRating;
    }

    public String getContentName() {
        return contentName;
    }

    public void setContentName(String contentName) {
        this.contentName = contentName;
    }
}
