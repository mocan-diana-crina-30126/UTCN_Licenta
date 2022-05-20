package utcn.licenta.MovApp.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import utcn.licenta.MovApp.dto.ChildrenDTO;
import utcn.licenta.MovApp.service.ChildrenServiceImpl;

import java.util.Collection;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/children")
public class ChildrenController {

    @Autowired
    private ChildrenServiceImpl childrenService;

    @GetMapping("/all")
    public Collection<ChildrenDTO> getAllCartoons() {

        return childrenService.getAllCartoons();

    }

    @GetMapping("/video/{id}")
    public List<String> getCartoonContent(@PathVariable("id") Integer id) {
        return childrenService.getCartoonContent(id);
    }

}
