export interface VolumeOption {
  value: string;
  label: string;
}

export interface ContactFormConfig {
  volumeOptions: VolumeOption[];
  privacyText: string;
  successMessage: string;
  errorMessage: string;
}

export interface LeadInput {
  email: string;
  company: string;
  volume: string;
  details: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
  leadId?: string;
}