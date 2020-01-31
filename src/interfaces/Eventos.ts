export interface EventoDTO {
  //[key: string]: number | string;
  idEvento: number;
  nombreEvento: string;
  usuario?: string;
  fechaInicio: string;
  fechaFin: string;
}
