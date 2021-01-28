package pl.tass.tassspring.model.entity.patent;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
@Entity
@Table(name = "patent_author_patent_author")
public class PatentAuthorPatentAuthor {
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patent_author_first_id")
    private PatentAuthor first;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "patent_author_second_id ")
    private PatentAuthor second;

    @Column(name = "strength")
    private Integer strength;


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PatentAuthorPatentAuthor that = (PatentAuthorPatentAuthor) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
