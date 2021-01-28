package pl.tass.tassspring.repository.patent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import pl.tass.tassspring.model.entity.patent.Patent;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PatentRepository extends JpaRepository<Patent, String> {
    @Query("SELECT DISTINCT p FROM Patent p JOIN FETCH p.authors WHERE p.date > ?1 AND p.date < ?2 ")
    List<Patent> findAllByDateIsAfterAndDateIsBefore(LocalDate from, LocalDate to);
    List<Patent> findAllByDateIsAfter(LocalDate from);
    List<Patent> findAllByDateIsBefore(LocalDate to);

    @Query("SELECT DISTINCT p FROM Patent p JOIN FETCH p.authors")
    List<Patent> findAllWithNested();
}
