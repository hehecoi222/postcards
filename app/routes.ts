import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/for/:name","routes/for.tsx"),
    route("/*", "routes/404.tsx")
] satisfies RouteConfig;
