import Link from "next/link";
import { postUseCases } from "@/infrastructure/container";

export const metadata = { title: "Archivo" };

const MONTHS = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

export default async function ArchivePage() {
  const entries = await postUseCases.archive();
  const byYear = new Map<number, typeof entries>();
  for (const e of entries) {
    const arr = byYear.get(e.year) ?? [];
    arr.push(e);
    byYear.set(e.year, arr);
  }
  return (
    <section>
      <h1>Archivo</h1>
      {[...byYear.entries()].map(([year, list]) => (
        <div key={year}>
          <h2>{year}</h2>
          <ul className="archive-list">
            {list.map(e => (
              <li key={`${e.year}-${e.month}`}>
                <Link href={`/archive/${e.year}/${e.month}`}>{MONTHS[e.month - 1]}</Link> ({e.count})
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
