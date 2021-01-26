package pl.tass.tassspring.model.entity.publication;

import lombok.*;
import pl.tass.tassspring.model.entity.patent.Patent;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@AllArgsConstructor
@Getter
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PatentAuthor that = (PatentAuthor) o;
        return Objects.equals(id, that.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
