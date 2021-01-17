package pl.tass.tassspring.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.tass.tassspring.model.dto.patent.InstitutionDto;
import pl.tass.tassspring.model.entity.patent.Institution;

import java.util.List;

@Repository
public interface InstitutionRepository extends JpaRepository<Institution, String> {
    List<InstitutionDto> findDistinctByTitleNotIn(List<String> titles);
}
