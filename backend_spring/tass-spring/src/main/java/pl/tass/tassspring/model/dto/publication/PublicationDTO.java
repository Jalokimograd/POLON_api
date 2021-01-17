package pl.tass.tassspring.model.dto.publication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class PublicationDTO {
    private String id;
    private String title;
    private String type;
    private LocalDate year;
    private List<PublicationAuthorDTO> authors;
}
