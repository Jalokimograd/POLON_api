package pl.tass.tassspring.model.entity.publication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;

import javax.persistence.*;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
@Entity
@Table(name = "publication_author_publication_author")
public class PublicationAuthorPublicationAuthor {
    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "publication_author_first_id")
    private PublicationAuthor first;

    @OneToOne
    @JoinColumn(name = "publication_author_second_id ")
    private PublicationAuthor second;

    @JoinColumn(name = "strength")
    private Integer strength;
}
