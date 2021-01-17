package pl.tass.tassspring.model.dto.patent;

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
public class PatentDTO {
    private String id;
    private String title;
    private String type;
    private LocalDate date;
    private List<PatentAuthorDTO> authors;
    private List<InstitutionDto> institutes;
}
