package pl.tass.tassspring.model.entity.publication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;
import pl.tass.tassspring.model.entity.patent.PatentAuthorPatentAuthor;

import javax.persistence.*;
import java.util.Objects;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
@Entity
@Table(name = "publication_author_publication_author")
public class PublicationAuthorPublicationAuthor {
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "publication_author_first_id")
    private PublicationAuthor first;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "publication_author_second_id ")
    private PublicationAuthor second;

    @Column(name = "strength")
    private Integer strength;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PublicationAuthorPublicationAuthor that = (PublicationAuthorPublicationAuthor) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
