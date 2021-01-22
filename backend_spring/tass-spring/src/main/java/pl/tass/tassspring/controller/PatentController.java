package pl.tass.tassspring.controller;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.tass.tassspring.model.dto.BrowserFilter;
import pl.tass.tassspring.model.dto.graph.GraphDTO;
import pl.tass.tassspring.model.dto.patent.InstitutionDto;
import pl.tass.tassspring.model.dto.patent.PatentResultDTO;
import pl.tass.tassspring.service.PatentService;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/patent")
public class PatentController {
    private final PatentService service;

    @GetMapping("/all")
    public PatentResultDTO getByFilter(BrowserFilter filter) {
        return service.getAllByFilter(filter);
    }
    @GetMapping("/graph/all")
    public GraphDTO getGraphByFilter(BrowserFilter filter) {
        return service.getGraphByFilter(filter);
    }
    @GetMapping("/institutes")
    public List<InstitutionDto> getInstitutes() {
        return service.getAllInstitutions();
    }
}
