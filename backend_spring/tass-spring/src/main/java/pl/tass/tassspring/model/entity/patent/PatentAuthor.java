package pl.tass.tassspring.model.entity.patent;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.tass.tassspring.model.entity.publication.PublicationAuthor;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

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

    private Integer connectionPower;

    @ManyToMany(mappedBy = "authors", fetch = FetchType.LAZY)
//    @ManyToOne(fetch = FetchType.LAZY, optional = false)
//    @JoinColumn(name = "patent_id")
    private List<Patent> patents;

    @OneToOne(optional = true, fetch = FetchType.LAZY)
    @JoinColumn(name = "publication_author_id", nullable = true)
    private PublicationAuthor publicationAuthor;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Institution> institutions;

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

    @Override
    public String toString() {
        return "PatentAuthor{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastNamePrefix='" + lastNamePrefix + '\'' +
                ", lastName='" + lastName + '\'' +
                ", calculatedEduLevel='" + calculatedEduLevel + '\'' +
                ", connectionPower=" + connectionPower +
                '}';
    }
}
