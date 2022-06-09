package utcn.licenta.MovApp.service.vlidator;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Objects;


/**
 * Validates a {@link LocalDateTime} that is parsable. No other validations applied like is before something.
 */
@Component
public class LocalDateValidator {

    private static final Logger LOG = LoggerFactory.getLogger(LocalDateValidator.class);


    public boolean isValid(String source) {
        if (Objects.isNull(source) || source.isBlank()) {
            return false;
        }

        try {
            LocalDate.parse(source);
        } catch (DateTimeParseException exception) {
            LOG.debug("Invalid LocalDateTime: {}", source, exception);
            return false;
        }

        return true;
    }
}
