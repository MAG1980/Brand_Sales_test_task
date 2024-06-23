import { PipelineEntity } from '@backend/lead/entities/pipeline.entity';

export interface PipelinesResponse {
  _embedded: {
    pipelines: PipelineEntity[];
  };
}
