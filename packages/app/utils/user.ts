import { head } from "ramda";

export function getInitials(name: string) {
  return name.split(" ").map(head).join("").toUpperCase().substring(0, 2);
}
