import {Goal} from './Goal';

export interface Board {
  id?: string;
  title: string;
  color: string;
  description: string;
  startDate: string;
  goals?: Goal[];
}
