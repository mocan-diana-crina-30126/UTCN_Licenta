package utcn.licenta.MovApp.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class MovieDuplicatedException extends Exception {

    private Integer mid;
}
