package pl.tass.tassspring.repository.patent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.tass.tassspring.model.entity.patent.Patent;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;
import pl.tass.tassspring.model.entity.patent.PatentAuthorPatentAuthor;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Repository
public interface PatentAuthorPatentAuthorRepository extends JpaRepository<PatentAuthorPatentAuthor, Long> {

    @Query("SELECT p FROM PatentAuthorPatentAuthor p JOIN p.first JOIN p.second WHERE p.first in(?1) OR p.second in(?1)")
    List<PatentAuthorPatentAuthor> getConnectedAuthors(Set<PatentAuthor> authors);
}
