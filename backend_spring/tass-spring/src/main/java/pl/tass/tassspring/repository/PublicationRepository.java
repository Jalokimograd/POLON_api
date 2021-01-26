package pl.tass.tassspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.tass.tassspring.model.entity.patent.Patent;
import pl.tass.tassspring.model.entity.patent.PatentAuthor;
import pl.tass.tassspring.model.entity.publication.Publication;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Repository
public interface PublicationRepository extends JpaRepository<Publication, String> {
    List<Publication> findAllByYearIsAfterAndYearIsBefore(LocalDate from, LocalDate to);
    List<Publication> findAllByYearIsAfter(LocalDate from);
    List<Publication> findAllByYearIsBefore(LocalDate to);


    @Query("SELECT p FROM Publication p JOIN p.authors pa JOIN pa.patentAuthor WHERE pa.patentAuthor.id IN(?1)")
    List<Publication> findAllByAuthors(List<String> authorsId);
}
