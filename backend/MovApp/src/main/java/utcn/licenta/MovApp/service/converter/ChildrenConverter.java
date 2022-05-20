package utcn.licenta.MovApp.service.converter;

import java.util.Collection;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;
import utcn.licenta.MovApp.dto.ChildrenDTO;
import utcn.licenta.MovApp.model.Children;

@Component
public class ChildrenConverter {

    public ChildrenDTO convertEntityToDTO(Children children){

        ChildrenDTO childrenDTO = new ChildrenDTO();
        childrenDTO.setId(children.getId());
        childrenDTO.setContent(children.getContent());
        childrenDTO.setDuration(children.getDuration());
        childrenDTO.setImage_path(children.getImage_path());
        childrenDTO.setLanguage(children.getLanguage());
        childrenDTO.setOverview(children.getOverview());
        childrenDTO.setPopularity(children.getPopularity());
        childrenDTO.setTitle(children.getTitle());
        childrenDTO.setRating(children.getRating());
        childrenDTO.setRelease_date(children.getRelease_date());

        return childrenDTO;
    }

    public Collection<ChildrenDTO> convertAll(Collection<Children> children){
        return children.stream().map(this::convertEntityToDTO).collect(Collectors.toList());
    }

}
