import type { Route } from "./+types/for";
import { redirect } from "react-router";
import { Postcard } from "../postcards/postcard";

let pageName = "Friend"

export function meta({}: Route.MetaArgs) {
  return [
    { title: `Dear ${pageName}` },
    { name: "description", content: `Send to the dearest ${pageName}` },
  ];
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
    try {
        const res = await fetch(`${import.meta.env.BASE_URL}data/${params.name}.json`)
        if (!res.ok) {
            throw redirect("/")
        }
        const data = await res.json()
        pageName = data.name
        return data
    } catch (err) {
        console.log(err)
        throw redirect("/")
    }
}

export default function For({ loaderData, }: Route.ComponentProps) {
  const {name, pages} = loaderData
  const data = {
    name: loaderData.name,
    pages: loaderData.pages
  }
  console.log(data)
  return <Postcard data={data} />;
}