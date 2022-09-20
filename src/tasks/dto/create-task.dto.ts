/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
/* eslint-disable prettier/prettier */
export class CreateTaskDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
}
