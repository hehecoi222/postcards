import { Welcome } from "~/welcome/welcome";
import type { Route } from "./+types/404";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Page404() {
  return <Welcome />
}
