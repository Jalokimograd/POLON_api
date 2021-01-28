package pl.tass.tassspring.repository.publication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;
import pl.tass.tassspring.model.entity.patent.PatentAuthorPatentAuthor;
import pl.tass.tassspring.model.entity.publication.PublicationAuthor;
import pl.tass.tassspring.model.entity.publication.PublicationAuthorPublicationAuthor;

import java.util.List;
import java.util.Set;

@Repository
public interface PublicationAuthorPublicationAuthorRepository extends JpaRepository<PublicationAuthorPublicationAuthor, Long> {

    @Query("SELECT DISTINCT p FROM PublicationAuthorPublicationAuthor p JOIN p.first JOIN p.second WHERE p.first in(?1) OR p.second in(?1)")
    List<PublicationAuthorPublicationAuthor> getConnectedAuthors(Set<PublicationAuthor> authors);
}
