package pl.tass.tassspring.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.tass.tassspring.model.dto.BrowserFilter;
import pl.tass.tassspring.model.dto.graph.GraphDTO;
import pl.tass.tassspring.model.dto.publication.PublicationResultDTO;
import pl.tass.tassspring.service.PublicationService;

@RestController
@RequestMapping("/publication")
@AllArgsConstructor
public class PublicationController {
    private PublicationService service;

    @GetMapping("/all")
    public PublicationResultDTO getByFilter(BrowserFilter filter) {
        return service.getAllByFilter(filter);
    }
    @GetMapping("/graph/all")
    public GraphDTO getGraphByFilter(BrowserFilter filter) {
        return service.getGraphByFilter(filter);
    }
}
