package pl.tass.tassspring.model.entity.publication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.tass.tassspring.model.entity.patent.Patent;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class PublicationAuthor {
    @Id
    private String id;
    private String name;
    private String lastName;

    @ManyToMany(mappedBy = "authors", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})

//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "publication_id")
    private List<Publication> publications;

    @OneToOne(optional = true, mappedBy = "publicationAuthor", fetch = FetchType.LAZY)
    @JoinColumn(name = "patent_author_id")
    private PatentAuthor patentAuthor;
}
