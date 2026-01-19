export interface BabyShowerData {
  parentNames: string;
  babyGender: 'boy' | 'girl' | 'surprise';
  date: string;
  time: string;
  venue: string;
  address: string;
  mapUrl: string;
  hostName: string;
  hostPhone: string;
  rsvpDeadline: string;
  registryLinks: RegistryLink[];
  giftSuggestions: string[];
  theme: string;
  dresscode?: string;
  specialNotes?: string;
}

export interface RegistryLink {
  store: string;
  url: string;
}

export type SlideType = 
  | 'welcome'
  | 'when'
  | 'where'
  | 'gifts'
  | 'rsvp'
  | 'summary';

