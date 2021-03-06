package pl.tass.tassspring.model.dto.graph;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class GraphLinkDTO {
//    private String id;
    private String source;
    private String target;
    private String label;
    private Integer strength;
}
