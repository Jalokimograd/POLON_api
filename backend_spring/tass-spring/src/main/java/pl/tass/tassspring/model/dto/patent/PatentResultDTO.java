package pl.tass.tassspring.model.dto.patent;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pl.tass.tassspring.model.dto.NetworkPropDTO;

import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class PatentResultDTO {
    private List<PatentDTO> patents;
}
