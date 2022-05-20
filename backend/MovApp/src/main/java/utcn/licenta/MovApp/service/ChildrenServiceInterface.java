package utcn.licenta.MovApp.service;

import utcn.licenta.MovApp.dto.ChildrenDTO;
import utcn.licenta.MovApp.model.Children;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface ChildrenServiceInterface {

    Collection<ChildrenDTO> getAllCartoons();
    List<String> getCartoonContent(Integer id);
    Optional<Children> getCartoonById(Integer cartoonId);

}
