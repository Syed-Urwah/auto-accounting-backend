import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateGeneralJournalDto {
  @IsNotEmpty()
  @IsString()
  userEntry: string;

  @IsNotEmpty()
  @IsNumber()
  companyId: number;
}