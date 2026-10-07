import { redirect } from "next/navigation";

/** Textes répartis entre /programmes et /impact. */
export default function ProgrammeImpactRedirect() {
  redirect("/programmes");
}
