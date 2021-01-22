package pl.tass.tassspring.model.dto.publication;

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
public class PublicationResultDTO {
    private List<PublicationDTO> publications;
}
