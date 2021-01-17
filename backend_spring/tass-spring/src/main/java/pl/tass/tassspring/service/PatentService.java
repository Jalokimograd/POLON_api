package pl.tass.tassspring.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.tass.tassspring.model.dto.BrowserFilter;
import pl.tass.tassspring.model.dto.patent.InstitutionDto;
import pl.tass.tassspring.model.dto.patent.PatentDTO;
import pl.tass.tassspring.model.entity.patent.Patent;
import pl.tass.tassspring.repository.InstitutionRepository;
import pl.tass.tassspring.repository.PatentRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class PatentService {
    private PatentRepository patentRepository;
    private InstitutionRepository institutionRepository;

    public List<InstitutionDto> getAllInstitutions() {
        return institutionRepository
                .findDistinctByTitleNotIn(List.of())
                .stream()
                .map(e -> InstitutionDto.builder().title(e.getTitle()).id(e.getId()).build())
                .collect(Collectors.toList());
    }

    public List<PatentDTO> getAllByFilter(BrowserFilter filter) {
        List<Patent> result;
        if (filter.getFrom() != null && filter.getTo() != null) {
            result = patentRepository.findAllByDateIsAfterAndDateIsBefore(filter.getFrom(), filter.getTo());
        } else if (filter.getFrom() != null) {
            result = patentRepository.findAllByDateIsBefore(filter.getFrom());
        } else if (filter.getTo() != null) {
            result = patentRepository.findAllByDateIsAfter(filter.getTo());
        } else {
            result = patentRepository.findAll();
        }
        if (filter.getInstitutions() != null && filter.getInstitutions().size() != 0) {
            result = result
                    .parallelStream()
                    .filter(e -> e.hasOneOfInstitute(filter.getInstitutions()))
                    .collect(Collectors.toList());
        }
        // now filter institutes
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
}
