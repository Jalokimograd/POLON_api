package pl.tass.tassspring.service.graphProps;

import lombok.Data;
import org.jgrapht.Graph;
import org.jgrapht.GraphPath;
import org.jgrapht.alg.scoring.ClusteringCoefficient;
import org.jgrapht.alg.shortestpath.DijkstraShortestPath;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.SimpleGraph;
import pl.tass.tassspring.model.dto.NetworkPropDTO;
import pl.tass.tassspring.model.dto.graph.GraphLinkDTO;
import pl.tass.tassspring.model.dto.graph.GraphNodeDTO;

import java.util.List;

import static pl.tass.tassspring.service.PublicationService.MAX_NODES;

@Data
public class GraphPropertyCalculator {
    private List<GraphLinkDTO> links;
    private List<GraphNodeDTO> nodes;

    public GraphPropertyCalculator(List<GraphLinkDTO> links, List<GraphNodeDTO> nodes) {
        this.links = links;
        this.nodes = nodes;
    }

    private Graph<String, DefaultEdge> graph = new SimpleGraph<>(DefaultEdge.class);

    public NetworkPropDTO calcNetworkProp() {
        buildCalcGraph();

        ClusteringCoefficient<String, DefaultEdge> cf = new ClusteringCoefficient<>(graph);

        double globalGrape = cf.getGlobalClusteringCoefficient();

        return NetworkPropDTO.builder()
                .avgPathLength(getAvgPathLength(cf))
                .avgDensity(getAvgDensity(cf))
                .avgVertexGrade(parseAvgVertexGrade(cf))
                .grape(cf.getAverageClusteringCoefficient())
                .globalGrape(Double.isNaN(globalGrape) ? 0.0 : globalGrape)
                .build();
    }


    private void buildCalcGraph() {
        nodes.forEach(e -> graph.addVertex(e.getId()));
        links.forEach(e -> {
            try {
                graph.addEdge(e.getSource(), e.getTarget());
            } catch (Exception ex) {
                System.out.println("UPS");
            }
        });

    }

    private Double getAvgDensity(ClusteringCoefficient<String, DefaultEdge> cf) {
        int vertexNum = graph.vertexSet().size();
        double edgesNum = graph.edgeSet().size();

        if(((vertexNum) * (vertexNum - 1)) == 0) {
            return 0.0;
        }
        return 2 * edgesNum / ((vertexNum) * (vertexNum - 1));
    }

    private Double getAvgPathLength(ClusteringCoefficient<String, DefaultEdge> cf) {
        double averagePathLength = 0;
        if(graph.vertexSet().size() >= MAX_NODES) {
            return 0.0;
        }
        for (String source : graph.vertexSet()) {
            for (String destination : graph.vertexSet()) {
                if (!source.equals(destination)) {
                    GraphPath<String, DefaultEdge> pathBetween = DijkstraShortestPath.findPathBetween(graph, source, destination);
                    if (pathBetween != null)
                        averagePathLength += pathBetween.getLength();
                }
            }
        }

        int vertexNum = graph.vertexSet().size();
        if((vertexNum * (vertexNum - 1)) == 0){
            return 0.0;
        }
        return averagePathLength / (vertexNum * (vertexNum - 1));
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
