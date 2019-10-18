<script>
  import { Router, Route } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";
  import Home from "./routes/Home.svelte";
  import RetrieveData from "./routes/RetrieveData.svelte";
  import Video from "./routes/Video.svelte";
  import Blog from "./routes/Blog.svelte";

  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

  import { onMount } from "svelte";
  const queryUrl =
    "https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-20/sparql";

  const query = `
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX dc: <http://purl.org/dc/elements/1.1/>
  PREFIX dct: <http://purl.org/dc/terms/>
  PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
  PREFIX edm: <http://www.europeana.eu/schemas/edm/>
  PREFIX foaf: <http://xmlns.com/foaf/0.1/>
  SELECT ?cho ?title ?placeName ?description ?imageLink WHERE {
    <https://hdl.handle.net/20.500.11840/termmaster7745> skos:narrower* ?place . #Ind0
    ?place skos:prefLabel ?placeName .
      
    <https://hdl.handle.net/20.500.11840/termmaster16239> skos:narrower* ?cat . # Strijd en oorlog
    # ?cat skos:prefLabel ?catLabel .
    ?cho dct:spatial ?place ;
    dc:type ?type ;
    edm:isShownBy ?imageLink ;
    dc:description ?description ;
    dc:title ?title .
    # FILTER langMatches(lang(?title), "ned")
  }
  LIMIT 30
  `;
  let results = [];

  function runQuery(queryUrl, query) {
    fetch(queryUrl + "?query=" + encodeURIComponent(query) + "&format=json")
      .then(res => res.json())
      .then(json => {
        results = JSON.parse(JSON.stringify(json.results));
        results = results.bindings;
        console.log(results);
      });
  }

  onMount(() => {
    runQuery(queryUrl, query);
  });

  const abc = "abc";
</script>

<Router {url}>
  <nav>
    <NavLink to="/">Home</NavLink>
    <NavLink to="video">Video</NavLink>
    <NavLink to="blog">Blog</NavLink>
    <NavLink to="retrieve-data">Retrieve Data</NavLink>
  </nav>
  <div>
    <Route path="video" component={Video} />
    <Route path="retrieve-data" {abc} {results} component={RetrieveData} />
    <Route path="blog/*" component={Blog} />
    <Route path="/" component={Home} />
  </div>
</Router>
