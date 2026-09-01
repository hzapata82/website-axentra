export default function HomePage() {
  return (
    <main id="main-content">
      <section id="hero" aria-labelledby="hero-heading">
        <div className="container-custom">
          <h1 id="hero-heading" className="sr-only">Axentra Cargo - Hero Section</h1>
          <p>Hero Section - COMANDA TU CARGA</p>
        </div>
      </section>
      <section id="valor" aria-labelledby="valor-heading">
        <div className="container-custom">
          <h2 id="valor-heading" className="sr-only">Arquitectura de Ahorro Operativo</h2>
          <p>Value Section - Arquitectura de Ahorro</p>
        </div>
      </section>
      <section id="servicios" aria-labelledby="servicios-heading">
        <div className="container-custom">
          <h2 id="servicios-heading" className="sr-only">Grilla de Servicios</h2>
          <p>Services Section - Grilla de Servicios</p>
        </div>
      </section>
      <section id="contacto" aria-labelledby="contacto-heading">
        <div className="container-custom">
          <h2 id="contacto-heading" className="sr-only">Contacto - Solicitar Evaluación Estratégica</h2>
          <p>Contact Section - Formulario</p>
        </div>
      </section>
    </main>
  );
}