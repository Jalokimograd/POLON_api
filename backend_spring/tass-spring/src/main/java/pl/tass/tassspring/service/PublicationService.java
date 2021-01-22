package pl.tass.tassspring.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tass.tassspring.model.dto.BrowserFilter;
import pl.tass.tassspring.model.dto.NetworkPropDTO;
import pl.tass.tassspring.model.dto.graph.GraphDTO;
import pl.tass.tassspring.model.dto.patent.PatentDTO;
import pl.tass.tassspring.model.dto.patent.PatentResultDTO;
import pl.tass.tassspring.model.dto.publication.PublicationDTO;
import pl.tass.tassspring.model.dto.publication.PublicationResultDTO;
import pl.tass.tassspring.model.entity.patent.Patent;
import pl.tass.tassspring.model.entity.publication.Publication;
import pl.tass.tassspring.repository.PublicationRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PublicationService implements EntityService<PublicationResultDTO>{
    private PublicationRepository publicationRepository;
    public PublicationResultDTO getAllByFilter(BrowserFilter filter) {
        return PublicationResultDTO
                .builder()
                .publications(getPublicationsByFilter(filter))
                .build();
    }

    private List<PublicationDTO> getPublicationsByFilter(BrowserFilter filter) {
        List<Publication> result;

        if (filter.getFrom() != null && filter.getTo() != null) {
            result = publicationRepository.findAllByYearIsAfterAndYearIsBefore(filter.getFrom().minusYears(1), filter.getTo().plusYears(1));
        } else if (filter.getFrom() != null) {
            result = publicationRepository.findAllByYearIsAfter(filter.getFrom().minusYears(1));
        } else if (filter.getTo() != null) {
            result = publicationRepository.findAllByYearIsBefore(filter.getTo().plusYears(1));
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
    @Override
    public NetworkPropDTO getNetworkPropByFilter(BrowserFilter filter) {
        return null;
    }

    public GraphDTO getGraphByFilter(BrowserFilter filter) {
        return GraphDTO.builder()
                .nodes(List.of())
                .links(List.of())
                .networkProp(getNetworkPropByFilter(filter))
                .build();
    }
}
