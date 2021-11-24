package utcn.licenta.MovApp.controller.advice;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import utcn.licenta.MovApp.exception.MovieDuplicatedException;
import utcn.licenta.MovApp.exception.MovieNotFoundException;

@ControllerAdvice
public class MovieControllerExceptionHandler {

    @ExceptionHandler(MovieNotFoundException.class)
    private ResponseEntity<?> handleMovieNotFoundException(MovieNotFoundException exception) {
        String responseMessage = "The provided movie [" + exception.getMid() + "] is nowhere to be found.";
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(responseMessage);
    }

    @ExceptionHandler(MovieDuplicatedException.class)
    private ResponseEntity<?> handleMovieDuplicatedException(MovieDuplicatedException exception) {
        String responseMessage = "The provided movie [" + exception.getMid() + "] is already existing.";
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(responseMessage);
    }
}
