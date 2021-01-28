package pl.tass.tassspring.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.tass.tassspring.model.dto.BrowserFilter;
import pl.tass.tassspring.model.dto.NetworkPropDTO;
import pl.tass.tassspring.model.dto.graph.GraphDTO;
import pl.tass.tassspring.model.dto.patent.InstitutionDto;
import pl.tass.tassspring.model.dto.patent.PatentDTO;
import pl.tass.tassspring.model.dto.patent.PatentResultDTO;
import pl.tass.tassspring.model.entity.patent.Patent;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;
import pl.tass.tassspring.repository.InstitutionRepository;
import pl.tass.tassspring.repository.patent.PatentAuthorPatentAuthorRepository;
import pl.tass.tassspring.repository.patent.PatentRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static pl.tass.tassspring.service.PublicationService.MAX_NODES;

@Service
@AllArgsConstructor
public class PatentService implements EntityService<PatentResultDTO> {
    private PatentRepository patentRepository;
    private InstitutionRepository institutionRepository;
    private PatentAuthorPatentAuthorRepository repository;

    public List<InstitutionDto> getAllInstitutions() {
        return institutionRepository
                .findAll()
                .stream()
                .map(e -> InstitutionDto.builder().title(e.getTitle()).id(e.getId()).build())
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public PatentResultDTO getAllByFilter(BrowserFilter filter) {
        return PatentResultDTO
                .builder()
                .patents(getPatentsDtoByFilter(filter))
                .build();
    }

    private List<PatentDTO> getPatentsDtoByFilter(BrowserFilter filter) {
        List<Patent> result = getPatentByFilter(filter);
        return result.parallelStream().map(e -> PatentDTO
                .builder()
                .id(e.getId())
                .type(e.getType())
                .date(e.getDate())
                .institutes(e.getInstitutesDTO())
                .authors(e.getAuthorsDTO())
                .title(e.getTitle())
                .build()).collect(Collectors.toList());
    }

    private List<Patent> getPatentByFilter(BrowserFilter filter) {
        List<Patent> result;
        if (filter.getFrom() != null && filter.getTo() != null) {
            result = patentRepository.findAllByDateIsAfterAndDateIsBefore(filter.getFrom(), filter.getTo());
        } else if (filter.getFrom() != null) {
            result = patentRepository.findAllByDateIsAfter(filter.getFrom());
        } else if (filter.getTo() != null) {
            result = patentRepository.findAllByDateIsBefore(filter.getTo());
        } else {
            result = patentRepository.findAllWithNested();
        }
        if (filter.getInstitutionsId() != null && filter.getInstitutionsId().size() != 0) {
            result = result
                    .parallelStream()
                    .filter(e -> e.hasOneOfInstitute(filter.getInstitutionsId()))
                    .collect(Collectors.toList());
        }
        if(filter.getAuthorNames() != null && filter.getAuthorNames().size() != 0){
            result = result
                    .parallelStream()
                    .filter(e -> e.hasOneOfAuthor(filter.getAuthorNames()))
                    .collect(Collectors.toList());
        }
        // now filter institutes
        return result;
    }

    public Set<PatentAuthor> getAuthorsByFilter(BrowserFilter filter){
        return getPatentByFilter(filter).stream().flatMap(e -> e.getAuthors().stream()).collect(Collectors.toSet());
    }
    public GraphDTO getGraphByFilter(BrowserFilter filter) {
        PatentGraphService graphService =
                new PatentGraphService(repository, getAuthorsByFilter(filter));


        graphService.buildGraph();

        return GraphDTO.builder()
                .nodes(graphService.getNodes().size() >= MAX_NODES ? List.of() : graphService.getNodes())
                .links(graphService.getNodes().size() >= MAX_NODES ? List.of() : graphService.getLinks())
                .networkProp(graphService.calcNetworkProp())
                .build();
    }
}
