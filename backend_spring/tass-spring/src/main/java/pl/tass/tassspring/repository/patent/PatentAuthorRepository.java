package pl.tass.tassspring.repository.patent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.tass.tassspring.model.entity.patent.Patent;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;

@Repository
public interface PatentAuthorRepository extends JpaRepository<PatentAuthor, String> {
}
