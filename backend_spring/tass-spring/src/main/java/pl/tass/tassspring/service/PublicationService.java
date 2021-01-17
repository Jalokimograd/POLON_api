package pl.tass.tassspring.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tass.tassspring.model.dto.BrowserFilter;
import pl.tass.tassspring.model.dto.patent.PatentDTO;
import pl.tass.tassspring.model.dto.publication.PublicationDTO;
import pl.tass.tassspring.model.entity.patent.Patent;
import pl.tass.tassspring.model.entity.publication.Publication;
import pl.tass.tassspring.repository.PublicationRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PublicationService {
    private PublicationRepository publicationRepository;
    public List<PublicationDTO> getAllByFilter(BrowserFilter filter) {
        List<Publication> result;
        if (filter.getFrom() != null && filter.getTo() != null) {
            result = publicationRepository.findAllByYearIsAfterAndYearIsBefore(filter.getFrom(), filter.getTo());
        } else if (filter.getFrom() != null) {
            result = publicationRepository.findAllByYearIsBefore(filter.getFrom());
        } else if (filter.getTo() != null) {
            result = publicationRepository.findAllByYearIsAfter(filter.getTo());
        } else {
            result = publicationRepository.findAll();
        }
        // now filter institutes
        return result.parallelStream().map(e -> PublicationDTO
                .builder()
                .id(e.getId())
                .type(e.getType())
                .year(e.getYear())
                .authors(e.getAuthorsDTO())
                .title(e.getTitle())
                .build()).collect(Collectors.toList());
    }
}
