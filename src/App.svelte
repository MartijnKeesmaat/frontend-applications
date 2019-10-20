<script>
  // Plugins
  import { Router, Route } from "svelte-routing";
  import { onMount } from "svelte";

  // Pages
  import Home from "./routes/Home.svelte";
  import RetrieveData from "./routes/RetrieveData.svelte";
  import Video from "./routes/Video.svelte";
  import Blog from "./routes/Blog.svelte";
  import Mask from "./routes/Mask.svelte";

  // Components
  import NavLink from "./components/NavLink.svelte";

  // Used for routing
  export let url = ""; // Used for SSR. A falsy value is ignored by the Router.

  // Specify which data is retrieved
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
  LIMIT 50
  `;
  let results = [];

  // Fetch data & clean it
  function runQuery(queryUrl, query) {
    fetch(queryUrl + "?query=" + encodeURIComponent(query) + "&format=json")
      .then(res => res.json())
      .then(json => {
        results = JSON.parse(JSON.stringify(json.results));
        results = results.bindings;
        results = results.map((result, index) => {
          return {
            id: index,
            description: result.description.value,
            imageLink: result.imageLink.value,
            title: result.title.value,
            placeName: result.placeName.value
          };
        });
      });
  }

  onMount(() => {
    runQuery(queryUrl, query);
  });
</script>

<Router {url}>
  <!-- Nav links -->
  <nav class="main-nav">
    <NavLink to="/">
      <img src="icons/logo.svg" alt="" />
    </NavLink>

    <div class="main-nav__links">
      <NavLink to="video">Video</NavLink>
      <NavLink to="blog">Blog</NavLink>
      <NavLink to="mask">Mask</NavLink>
      <NavLink to="retrieve-data">Retrieve Data</NavLink>
    </div>
  </nav>

  <!-- Route pages -->
  <div>
    <Route path="video" component={Video} />
    <Route path="retrieve-data" {results} component={RetrieveData} />
    <Route path="blog/*" component={Blog} />
    <Route path="/" component={Home} />
    <Route path="mask" component={Mask} />
  </div>
</Router>
