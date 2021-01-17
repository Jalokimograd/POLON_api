package pl.tass.tassspring.model.entity.patent;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.tass.tassspring.model.entity.publication.PublicationAuthor;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class PatentAuthor {
    @Id
    private String id;
    private String firstName;
    private String middleName;
    private String lastNamePrefix;
    private String lastName;

    private String calculatedEduLevel;

    @ManyToMany(mappedBy = "authors", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "patent_id")
    private List<Patent> patents;

    @OneToOne(optional = true)
    @JoinColumn(name = "publication_author_id")
    private PublicationAuthor publicationAuthor;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Institution> institutions;
}
