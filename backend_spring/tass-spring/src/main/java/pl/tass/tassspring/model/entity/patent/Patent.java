package pl.tass.tassspring.model.entity.patent;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.tass.tassspring.model.dto.patent.InstitutionDto;
import pl.tass.tassspring.model.dto.patent.PatentAuthorDTO;
import pl.tass.tassspring.model.entity.publication.PublicationAuthor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class Patent {
    @Id
    private String id;
    private String title;
    private String type;
    private LocalDate date;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
//    @OneToMany(mappedBy = "patent", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<PatentAuthor> authors;
    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Institution> institutions;

    public boolean hasOneOfInstitute(List<String> oneOfInstitutes) {
        return institutions
                .stream()
                .anyMatch(e -> oneOfInstitutes.contains(e.getTitle()));
    }

    public List<PatentAuthorDTO> getAuthorsDTO() {
        return authors.stream()
                .map(e -> PatentAuthorDTO.builder().id(e.getId()).firstName(e.getFirstName()).lastName(e.getLastName()).build())
                .collect(Collectors.toList());
    }

    public List<InstitutionDto> getInstitutesDTO() {
        return institutions.stream().map(e -> InstitutionDto.builder().id(e.getId()).title(e.getTitle()).build()).collect(Collectors.toList());
    }
}
