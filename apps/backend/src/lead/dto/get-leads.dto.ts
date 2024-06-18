import { IsOptional, MinLength } from "class-validator";

export class GetLeadsDto {
  @IsOptional()
  @MinLength(3)
  query: string
}