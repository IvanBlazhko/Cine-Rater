import { IPremiere } from './premiere.interface';

export interface IPoster extends IPremiere {
  imDbRating: string;
  imDbRatingCount: string;
}
