package pl.tass.tassspring.service;

import lombok.Getter;
import org.jgrapht.Graph;
import org.jgrapht.alg.densesubgraph.GoldbergMaximumDensitySubgraphAlgorithmBase;
import org.jgrapht.alg.scoring.ClusteringCoefficient;
import org.jgrapht.graph.DefaultEdge;
import org.jgrapht.graph.SimpleGraph;
import pl.tass.tassspring.model.dto.BrowserFilter;
import pl.tass.tassspring.model.dto.NetworkPropDTO;
import pl.tass.tassspring.model.dto.graph.GraphLinkDTO;
import pl.tass.tassspring.model.dto.graph.GraphNodeDTO;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;
import pl.tass.tassspring.model.entity.patent.PatentAuthorPatentAuthor;
import pl.tass.tassspring.repository.patent.PatentAuthorPatentAuthorRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class PatentGraphService {

    private PatentAuthorPatentAuthorRepository repository;

    private BrowserFilter filter;
    private Set<PatentAuthor> authors;

    private Graph<String, DefaultEdge> graph = new SimpleGraph<>(DefaultEdge.class);

    public PatentGraphService(PatentAuthorPatentAuthorRepository repository, BrowserFilter filter, Set<PatentAuthor> authors) {
        this.repository = repository;
        this.filter = filter;
        this.authors = authors;
    }

    @Getter
    private List<GraphLinkDTO> links;
    @Getter
    private List<GraphNodeDTO> nodes;

    @Getter
    private NetworkPropDTO networkProp;


    public void buildGraph() {
        List<PatentAuthorPatentAuthor> connectedAuthors = repository.getConnectedAuthors(authors);

        buildNodes(connectedAuthors);
        buildLinks(connectedAuthors);

        buildCalcGraph();
        calculateFactors();
    }

    private void buildCalcGraph() {
        nodes.forEach(e -> graph.addVertex(e.getId()));
        links.forEach(e -> graph.addEdge(e.getSource(), e.getTarget()));
    }

    private void calculateFactors() {
        // klasa odpowiedzialna za liczenie
        ClusteringCoefficient<String, DefaultEdge> cf = new ClusteringCoefficient<>(graph);

        networkProp = NetworkPropDTO.builder()
                .avgClustering(getAvgClustering(cf))
                .avgDensity(getAvgDensity(cf))
                .avgVertexGrade(parseAvgVertexGrade(cf))
                .grape(cf.getAverageClusteringCoefficient())
                .globalGrape(cf.getGlobalClusteringCoefficient())
                .build();
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

    private void buildNodes(List<PatentAuthorPatentAuthor> connectedAuthors) {
        this.nodes = connectedAuthors
                .parallelStream()
                .flatMap(e -> Stream.of(e.getFirst(), e.getSecond()))
                .distinct()
                .map(e -> GraphNodeDTO.builder()
                        .id(e.getId())
                        .label(e.getFirstName() + " " + e.getLastName())
                        .build()
                ).collect(Collectors.toList());

    }

    private void buildLinks(List<PatentAuthorPatentAuthor> connectedAuthors) {
        this.links = connectedAuthors
                .parallelStream()
                .distinct()
                .map(e -> GraphLinkDTO.builder()
//                        .id(e.getId().toString())
                             .label(e.getStrength().toString())
                             .source(e.getFirst().getId())
                             .target(e.getSecond().getId())
                             .strength(e.getStrength())
                             .build()
                ).collect(Collectors.toList());
    }
}
