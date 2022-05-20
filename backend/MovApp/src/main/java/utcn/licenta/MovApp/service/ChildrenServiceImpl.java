package utcn.licenta.MovApp.service;

import org.springframework.stereotype.Service;
import utcn.licenta.MovApp.dto.ChildrenDTO;
import utcn.licenta.MovApp.model.Children;
import utcn.licenta.MovApp.repository.ChildrenRepository;
import utcn.licenta.MovApp.service.converter.ChildrenConverter;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class ChildrenServiceImpl implements ChildrenServiceInterface{

    private final ChildrenRepository childrenRepository;
    private final ChildrenConverter childrenConverter;

    public ChildrenServiceImpl(ChildrenRepository childrenRepository, ChildrenConverter childrenConverter) {
        this.childrenRepository = childrenRepository;
        this.childrenConverter = childrenConverter;
    }


    @Override
    public Collection<ChildrenDTO> getAllCartoons() {
        List<Children> list = childrenRepository.getAllCartoons();

        return childrenConverter.convertAll(list);
    }


    @Override
    public List<String> getCartoonContent(Integer id) {
        return childrenRepository.getCartoonContent(id);
    }

    @Override
    public Optional<Children> getCartoonById(Integer cartoonId) {
        return childrenRepository.findById(cartoonId);
    }
}
