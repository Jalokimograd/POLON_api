package pl.tass.tassspring.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class BrowserFilter {
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate from;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
    private LocalDate to;
    private List<String> institutions;
}
