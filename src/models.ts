export interface Patient {
  id: number
  name: string
  company: string
}

export interface Appointment {
  id: number
  datetime: string
  created_at: string
  patient_id: number
  note: string
}

export interface UserAction {
  id: number
  patient_id: number
  action: string
  datetime: string
}

export interface PatientPage extends Patient {
  name: string
  appointments: Array<Appointment>
  userActions: Array<UserAction>
}
