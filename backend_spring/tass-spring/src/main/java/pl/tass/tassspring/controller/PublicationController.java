package pl.tass.tassspring.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.tass.tassspring.model.dto.BrowserFilter;
import pl.tass.tassspring.model.dto.patent.PatentDTO;
import pl.tass.tassspring.model.dto.publication.PublicationDTO;
import pl.tass.tassspring.service.PublicationService;

import java.util.List;

@RestController
@RequestMapping("/publication")
@AllArgsConstructor
public class PublicationController {
    private PublicationService service;

    @GetMapping("/all")
    public List<PublicationDTO> getByFilter(BrowserFilter filter) {
        return service.getAllByFilter(filter);
    }

}
