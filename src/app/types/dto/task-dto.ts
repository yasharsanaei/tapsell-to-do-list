export interface TaskDto {
  title: string;
  description: string;
  done: boolean;
  date: Date;
  list: string;
  id?: string;
}
