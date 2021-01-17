package pl.tass.tassspring.model.dto.patent;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class InstitutionDto {
    private String id;
    private String title;
}
