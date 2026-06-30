import {
  hello,
  VERSION,
} from "@/services/xtream";

export default function TestPage() {
  return (
    <main>
      <h1>{hello()}</h1>
      <p>{VERSION}</p>
    </main>
  );
}