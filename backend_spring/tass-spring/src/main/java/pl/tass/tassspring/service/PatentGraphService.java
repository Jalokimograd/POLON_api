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
import pl.tass.tassspring.service.graphProps.GraphPropertyCalculator;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class PatentGraphService {

    private PatentAuthorPatentAuthorRepository repository;

    private Set<PatentAuthor> authors;

    public PatentGraphService(PatentAuthorPatentAuthorRepository repository, Set<PatentAuthor> authors) {
        this.repository = repository;
        this.authors = authors;
    }

    @Getter
    private List<GraphLinkDTO> links;
    @Getter
    private List<GraphNodeDTO> nodes;

    public void buildGraph() {
        List<PatentAuthorPatentAuthor> connectedAuthors = repository.getConnectedAuthors(authors);

        buildNodes(connectedAuthors);
        buildLinks(connectedAuthors);
    }

    public NetworkPropDTO calcNetworkProp() {
        return new GraphPropertyCalculator(links, nodes).calcNetworkProp();
    }

    private void buildNodes(List<PatentAuthorPatentAuthor> connectedAuthors) {
        this.nodes = connectedAuthors
                .parallelStream()
                .distinct()
                .flatMap(e -> Stream.of(e.getFirst(), e.getSecond()))
                .map(e -> GraphNodeDTO.builder()
                        .id(e.getId())
                        .label(e.getFirstName() + " " + e.getLastName())
                        .build()
                ).distinct().collect(Collectors.toList());

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
                ).distinct().collect(Collectors.toList());
    }
}
