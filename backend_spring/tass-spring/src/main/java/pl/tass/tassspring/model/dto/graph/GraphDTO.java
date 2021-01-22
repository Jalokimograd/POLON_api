package pl.tass.tassspring.model.dto.graph;

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
public class GraphDTO {
    private List<GraphNodeDTO> nodes;
    private List<GraphLinkDTO> links;
    private NetworkPropDTO networkProp;
}
