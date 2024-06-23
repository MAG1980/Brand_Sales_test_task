import { Pipeline } from '@backend/lead/interfaces/pipeline.interface';

export interface PipelinesResponse {
  _embedded: {
    pipelines: Pipeline[];
  };
}
