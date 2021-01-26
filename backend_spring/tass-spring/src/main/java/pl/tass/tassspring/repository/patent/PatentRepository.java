package pl.tass.tassspring.repository.patent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.tass.tassspring.model.entity.patent.Patent;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface PatentRepository extends JpaRepository<Patent, String> {
    List<Patent> findAllByDateIsAfterAndDateIsBefore(LocalDate from, LocalDate to);
    List<Patent> findAllByDateIsAfter(LocalDate from);
    List<Patent> findAllByDateIsBefore(LocalDate to);
}
