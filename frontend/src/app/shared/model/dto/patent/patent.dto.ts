import { UnitDto } from '../unit.dto';
import { PatentCreatorDto } from './patent-creator.dto';

export interface PatentDto {
  id: number;
  number: string;
  date: Date;
  country: string;
  productName: string;
  type: string;
  creators: PatentCreatorDto[];
  units: UnitDto[];
}
