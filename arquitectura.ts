// Dominio
class Medic {
  name: string;
  lastname: string;
  cmp: string;

  constructor(name: string, lastname: string, cmp: string) {
    this.name = name;
    this.lastname = lastname;
    this.cmp = cmp;
  }
}

interface MedicRepository {
  insert(medic: Medic): Medic;
  update(id: number, medic: Medic): Medic;
  delete(id: number): number;
  list(): string[];
}

// Aplicación
class MedicUseCase {
  medicOperation: MedicRepository;

  constructor(medicOperation: MedicRepository) {
    this.medicOperation = medicOperation;
  }

  insert(medic: Medic) {
    return this.medicOperation.insert(medic);
  }

  update(id: number, medic: Medic) {
    return this.medicOperation.update(id, medic);
  }

  delete(id: number) {
    return this.medicOperation.delete(id);
  }

  list() {
    return this.medicOperation.list();
  }
}

// Infraestructura
class MedicOperation implements MedicRepository {
  insert(medic: Medic) {
    return medic;
  }

  update(id: number, medic: Medic) {
    return medic;
  }

  delete(id: number) {
    return id;
  }

  list() {
    return [];
  }

  getOne() {}
}

const medic = new Medic("Sergio", "Hidalgo", "23455");
const medicOperation = new MedicOperation();
const medicUseCase = new MedicUseCase(medicOperation);

medicUseCase.insert(medic);
