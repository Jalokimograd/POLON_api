package pl.tass.tassspring.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class NetworkPropDTO {
    private Double avgDensity; // średnia gęstość
    private Double avgClustering; // średni wsp. klasteryzacji
    private Double grape; // wsp. gronowania
    private Double avgVertexGrade; // średni stopień wierzchołka
}
