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
import pl.tass.tassspring.model.entity.patent.PatentAuthor;
import pl.tass.tassspring.model.entity.publication.Publication;
import pl.tass.tassspring.model.entity.publication.PublicationAuthor;
import pl.tass.tassspring.repository.PublicationRepository;
import pl.tass.tassspring.repository.publication.PublicationAuthorPublicationAuthorRepository;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PublicationService implements EntityService<PublicationResultDTO> {
    private PublicationAuthorPublicationAuthorRepository repository;
    private PublicationRepository publicationRepository;
    private PatentService patentService;

    public PublicationResultDTO getAllByFilter(BrowserFilter filter) {
        return PublicationResultDTO
                .builder()
                .publications(getPublicationsDTOByFilter(filter))
                .build();
    }

    private List<PublicationDTO> getPublicationsDTOByFilter(BrowserFilter filter) {
        List<Publication> allByAuthors = getPublicationByFilter(filter);

        return allByAuthors.parallelStream().map(e -> PublicationDTO
                .builder()
                .id(e.getId())
                .type(e.getType())
                .year(e.getYear())
                .authors(e.getAuthorsDTO())
                .title(e.getTitle())
                .build()).collect(Collectors.toList());
    }

    private List<Publication> getPublicationByFilter(BrowserFilter filter) {
        Set<PatentAuthor> authorsByFilter = patentService.getAuthorsByFilter(filter);

        List<Publication> result = publicationRepository
                .findAllByAuthors(authorsByFilter
                                          .stream()
                                          .map(PatentAuthor::getId)
                                          .collect(Collectors.toList())
                );
        if (filter.getFrom() != null) {
            result = result.stream().filter(e -> e.getYear().isAfter(filter.getFrom().minusYears(1))).collect(Collectors.toList());
        }
        if (filter.getTo() != null) {
            result = result.stream().filter(e -> e.getYear().isBefore(filter.getTo().plusYears(1))).collect(Collectors.toList());
        }
        return result;
    }

    public Set<PublicationAuthor> getAuthorsByFilter(BrowserFilter filter) {
        return getPublicationByFilter(filter).stream().flatMap(e -> e.getAuthors().stream()).collect(Collectors.toSet());
    }

    public GraphDTO getGraphByFilter(BrowserFilter filter) {
        PublicationGraphService patentGraphService =
                new PublicationGraphService(repository, filter, getAuthorsByFilter(filter));


        patentGraphService.buildGraph();

        return GraphDTO.builder()
                .nodes(patentGraphService.getNodes())
                .links(patentGraphService.getLinks())
                .networkProp(patentGraphService.getNetworkProp())
                .build();
    }
}
