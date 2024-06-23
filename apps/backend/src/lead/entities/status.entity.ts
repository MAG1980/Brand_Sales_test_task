export class StatusEntity {
  constructor({ name, id, pipeline_id, color }) {
    this.id = id;
    this.name = name;
    this.pipeline_id = pipeline_id;
    this.color = color;
  }

  id: number;
  name: string;
  pipeline_id: number;
  color: string;
}
