import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{ padding: "3rem 0" }}>
      <h1>Pagina no encontrada</h1>
      <p>Ese contenido se perdio entre nebulas.</p>
      <Link href="/">Volver al inicio</Link>
    </section>
  );
}
