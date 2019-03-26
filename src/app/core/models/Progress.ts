import {Goal} from '@core/models/Goal';

export interface Progress {
  goalsTodo: Goal[];
  goalsDone: Goal[];
  goalsFailed: Goal[];
}
