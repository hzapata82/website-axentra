import type { Industry } from '@/types/industry';

export const industriesData: Industry[] = [
  {
    name: 'Automotriz',
    description: 'Cadenas de suministro Just-in-Time y líneas de ensamble',
    icon: 'automotive',
    order: 1,
  },
  {
    name: 'Comercio / Retail',
    description: 'Transporte masivo y surtido continuo',
    icon: 'retail',
    order: 2,
  },
  {
    name: 'Farmacéutico',
    description: 'Control riguroso de temperatura y protocolos de seguridad',
    icon: 'pharma',
    order: 3,
  },
  {
    name: 'Construcción',
    description: 'Manejo de materiales pesados y entregas en obra',
    icon: 'construction',
    order: 4,
  },
  {
    name: 'Tecnología & Alto Valor',
    description: 'Esquemas de seguridad reforzada y GPS espejo',
    icon: 'tech',
    order: 5,
  },
  {
    name: 'Acero & Sobredimensionados',
    description: 'Equipos especializados y arrastres de alto tonelaje',
    icon: 'steel',
    order: 6,
  },
];