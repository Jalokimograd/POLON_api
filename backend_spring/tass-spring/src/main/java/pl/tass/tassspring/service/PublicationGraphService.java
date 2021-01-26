package pl.tass.tassspring.service;

import lombok.Getter;
import pl.tass.tassspring.model.dto.BrowserFilter;
import pl.tass.tassspring.model.dto.NetworkPropDTO;
import pl.tass.tassspring.model.dto.graph.GraphLinkDTO;
import pl.tass.tassspring.model.dto.graph.GraphNodeDTO;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;
import pl.tass.tassspring.model.entity.patent.PatentAuthorPatentAuthor;
import pl.tass.tassspring.model.entity.publication.PublicationAuthor;
import pl.tass.tassspring.model.entity.publication.PublicationAuthorPublicationAuthor;
import pl.tass.tassspring.repository.patent.PatentAuthorPatentAuthorRepository;
import pl.tass.tassspring.repository.publication.PublicationAuthorPublicationAuthorRepository;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class PublicationGraphService {

    private PublicationAuthorPublicationAuthorRepository repository;

    private BrowserFilter filter;
    private Set<PublicationAuthor> authors;

    public PublicationGraphService(PublicationAuthorPublicationAuthorRepository repository, BrowserFilter filter, Set<PublicationAuthor> authors) {
        this.repository = repository;
        this.filter = filter;
        this.authors = authors;
    }

    @Getter
    private List<GraphLinkDTO> links;
    @Getter
    private List<GraphNodeDTO> nodes;


    public void buildGraph() {
        List<PublicationAuthorPublicationAuthor> connectedAuthors = repository.getConnectedAuthors(authors);

        buildNodes(connectedAuthors);
        buildLinks(connectedAuthors);
    }

    private void buildNodes(List<PublicationAuthorPublicationAuthor> connectedAuthors) {
        this.nodes = connectedAuthors
                .parallelStream()
                .flatMap(e -> Stream.of(e.getFirst(), e.getSecond()))
                .distinct()
                .map(e -> GraphNodeDTO.builder()
                        .id(e.getId())
                        .label(e.getName() + " " + e.getLastName())
                        .build()
                ).collect(Collectors.toList());

    }

    private void buildLinks(List<PublicationAuthorPublicationAuthor> connectedAuthors) {
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

    public NetworkPropDTO getNetworkProp() {
        return NetworkPropDTO.builder().avgClustering(0.0).avgDensity(0.0).avgVertexGrade(0.0).globalGrape(0.0).grape(0.0).build();
    }
}
