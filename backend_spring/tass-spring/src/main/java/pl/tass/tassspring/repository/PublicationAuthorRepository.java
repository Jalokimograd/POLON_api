package pl.tass.tassspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;
import pl.tass.tassspring.model.entity.publication.PublicationAuthor;

@Repository
public interface PublicationAuthorRepository extends JpaRepository<PublicationAuthor, String> {
}
