import { redirect } from "next/navigation";

/** Le contenu de cette page est repris sur /programmes, sans suppression des textes. */
export default function ProgrammeRedirect() {
  redirect("/programmes");
}
