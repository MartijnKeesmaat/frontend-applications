<script>
  import { Router, Route } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";
  import Home from "./routes/Home.svelte";
  import Video from "./routes/Video.svelte";
  import Blog from "./routes/Blog.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";
</script>

<Router {url}>
  <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="video">Video</NavLink>
    <NavLink to="blog">Blog</NavLink>
  </nav>
  <div>
    <Route path="video" component={Video} />
    <Route path="blog/*" component={Blog} />
    <Route path="/" component={Home} />
  </div>
</Router>
