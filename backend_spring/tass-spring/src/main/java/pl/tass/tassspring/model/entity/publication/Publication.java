package pl.tass.tassspring.model.entity.publication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.tass.tassspring.model.dto.patent.PatentAuthorDTO;
import pl.tass.tassspring.model.dto.publication.PublicationAuthorDTO;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class Publication {
    @Id
    private String id;
    private String title;
    private String type;
    private LocalDate year;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
//    @OneToMany(mappedBy = "publication", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<PublicationAuthor> authors;

    public List<PublicationAuthorDTO> getAuthorsDTO() {
        return authors.stream()
                .map(e -> PublicationAuthorDTO.builder().id(e.getId()).firstName(e.getName()).lastName(e.getLastName()).build())
                .collect(Collectors.toList());
    }
}
