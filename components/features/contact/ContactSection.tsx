import { ContactForm } from '@/components/features/contact/ContactForm';

export function ContactSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="contacto-heading"
      className="bg-navy text-white"
    >
      <div className="container-custom grid grid-cols-1 gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <div className="flex flex-col justify-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-blue">
            Conversión
          </p>
          <h2
            id="contacto-heading"
            className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white text-balance"
          >
            Solicita tu Evaluación Estratégica
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-light text-pretty">
            Cuéntanos tu operación. En menos de 24 horas un especialista te
            contactará con un análisis preliminar y una propuesta de
            optimización a la medida.
          </p>
          <dl className="mt-8 space-y-3 text-sm text-slate-light">
            <div>
              <dt className="font-semibold text-white">Email directo</dt>
              <dd>ventas@axentracargo.com</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Cobertura</dt>
              <dd>México · Estados Unidos · Canadá</dd>
            </div>
          </dl>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}