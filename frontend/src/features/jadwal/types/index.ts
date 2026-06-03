export interface JadwalTreatment {
  id: string;
  hari: string; // ISO date string
  tempat: string;
  nama: string;
  pengingat: string; // ISO date string
  createdAt: string;
  updatedAt: string;
}

export interface CreateTreatmentDTO {
  hari: string;
  tempat: string;
  nama: string;
  pengingat?: string;
}

export interface UpdateTreatmentDTO {
  hari?: string;
  tempat?: string;
  nama?: string;
  pengingat?: string;
}

export interface JadwalHabit {
  id: string;
  nama: string;
  hari: string; // ex: "senin"
  jam: string; // ex: "22:00"
  pengingat: string; // ex: "21:00"
  createdAt: string;
  updatedAt: string;
}

export interface CreateHabitDTO {
  nama: string;
  hari: string;
  jam: string;
  pengingat?: string;
}

export interface UpdateHabitDTO {
  nama?: string;
  hari?: string;
  jam?: string;
  pengingat?: string;
}
