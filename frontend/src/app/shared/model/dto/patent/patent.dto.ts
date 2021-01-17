import { InstitutionDto } from '../institution.dto';
import { PatentAuthorDto } from './patent-author.dto';

export interface PatentDto {
  id: string;
  title: string;
  type: string;
  date: Date;
  authors: PatentAuthorDto[];
  institutes: InstitutionDto[];
}
