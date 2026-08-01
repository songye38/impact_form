export type BodyPart =
  | "얼굴"
  | "오른팔"
  | "왼팔"
  | "오른다리"
  | "왼다리";


export interface PatientInfo {
    name: string;
    phone: string;
    age: string | null;
}


export interface ParticipantInfo {
    forWho: string | null;
    relationship: string | null;
}


export interface ParticipationInfo {
    onlineAvailable: string | null;
    diagnosisPeriod: string | null;
    rehabilitationStatus: string | null;
    deviceAvailable: string | null;
}


export interface SafetyInfo {
    affectedParts: string[];
    description: string;
}


export interface PrepareData {
    patient: PatientInfo;
    participant: ParticipantInfo;
    participation: ParticipationInfo;
    safety: SafetyInfo;
}