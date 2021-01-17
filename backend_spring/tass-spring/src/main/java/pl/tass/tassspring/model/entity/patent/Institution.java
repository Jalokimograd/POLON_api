package pl.tass.tassspring.model.entity.patent;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class Institution {
    @Id
    private String id;
    private String title;

    @ManyToMany(mappedBy = "institutions", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<Patent> patents;

    @ManyToMany(mappedBy = "institutions", fetch = FetchType.LAZY, cascade = {CascadeType.ALL})
    private List<PatentAuthor> patentAuthors;
}
