package pl.tass.tassspring.service.graphProps;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.jgrapht.Graph;
import org.jgrapht.alg.scoring.ClusteringCoefficient;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.SimpleGraph;
import pl.tass.tassspring.model.dto.NetworkPropDTO;
import pl.tass.tassspring.model.dto.graph.GraphLinkDTO;
import pl.tass.tassspring.model.dto.graph.GraphNodeDTO;

import java.util.List;

@Data
public class GraphPropertyCalculator {
    private List<GraphLinkDTO> links;
    private List<GraphNodeDTO> nodes;

    public GraphPropertyCalculator(List<GraphLinkDTO> links, List<GraphNodeDTO> nodes) {
        this.links = links;
        this.nodes = nodes;
    }

    private Graph<String, DefaultEdge> graph = new SimpleGraph<>(DefaultEdge.class);

    public NetworkPropDTO calcNetworkProp(){
        buildCalcGraph();

        ClusteringCoefficient<String, DefaultEdge> cf = new ClusteringCoefficient<>(graph);

        return NetworkPropDTO.builder()
                .avgClustering(getAvgClustering(cf))
                .avgDensity(getAvgDensity(cf))
                .avgVertexGrade(parseAvgVertexGrade(cf))
                .grape(cf.getAverageClusteringCoefficient())
                .globalGrape(cf.getGlobalClusteringCoefficient())
                .build();
    }


    private void buildCalcGraph() {
        nodes.forEach(e -> graph.addVertex(e.getId()));
        links.forEach(e -> graph.addEdge(e.getSource(), e.getTarget()));
    }

    private Double getAvgDensity(ClusteringCoefficient<String, DefaultEdge> cf) {
        int vertexNum = graph.vertexSet().size();
        double edgesNum = graph.edgeSet().size();
        return 2*edgesNum/((vertexNum)*(vertexNum-1));
    }

    private Double getAvgClustering(ClusteringCoefficient<String, DefaultEdge> cf) {
        return cf.getScores().values().stream().mapToDouble(e -> e).average().orElse(0);
    }

    private Double parseAvgVertexGrade(ClusteringCoefficient<String, DefaultEdge> cf) {
        int vertexNum = graph.vertexSet().size();
        double edgesNum = graph.edgeSet().size();

        if (vertexNum == 0) {
            return 0.0;
        }
        return 2 * edgesNum / vertexNum;
    }
}
