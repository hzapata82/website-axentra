import type { Service } from '@/types/service';

export const servicesData: Service[] = [
  {
    number: '01',
    title: 'Gestión de Transporte',
    description: 'Optimized routing, carrier selection, and real-time tracking for end-to-end supply chain visibility.',
    icon: 'truck',
    order: 1,
  },
  {
    number: '02',
    title: 'Coordinación de Cruce',
    description: 'Seamless border crossing management, customs compliance, and expedited processing protocols.',
    icon: 'border',
    order: 2,
  },
  {
    number: '03',
    title: 'Carga Especial',
    description: 'Handling of oversized, hazardous, or temperature-controlled freight with specialized equipment.',
    icon: 'special',
    order: 3,
  },
  {
    number: '04',
    title: 'Gestión de Proyectos',
    description: 'Comprehensive planning and execution for complex, multi-modal logistics operations.',
    icon: 'projects',
    order: 4,
  },
  {
    number: '05',
    title: 'Servicios de Almacenaje',
    description: 'Secure, strategically located warehousing with inventory management and distribution capabilities.',
    icon: 'warehouse',
    order: 5,
  },
];