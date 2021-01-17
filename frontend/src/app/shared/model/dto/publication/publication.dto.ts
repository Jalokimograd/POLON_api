import { PublicationAuthorDto } from './publication-author.dto';

export interface PublicationDto {
  id: string;
  year: Date;
  title: string;
  type: string;
  authors: PublicationAuthorDto[];
}
