package utcn.licenta.MovApp.exception;

public class InvalidFieldException extends Exception {
    private String message;

    public InvalidFieldException(String message) {
        super(message);
        this.message = message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }
}
