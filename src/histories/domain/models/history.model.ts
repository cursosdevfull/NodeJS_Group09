export class HistoryModel {
  constructor(
    public id: number,
    public namePatient: string,
    public lastnamePatient: string,
    public age: number,
    public gender: boolean,
    public phone: string,
    public address: string,
    public sympthons: string,
    public observations: string,
    public treatment: string
  ) {}
}
