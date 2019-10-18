# 📸 Perspective

> An educative interaction

The goal of Perspective is to educate students by placing them behind the lens. They will take snapshots of certain important moments in history. These snapshots will be combined with data from the [Tropen Museum](https://www.tropenmuseum.nl/) into an storytelling website.

![a0709ab439210cd67698d4b670b485ab](https://user-images.githubusercontent.com/8048514/67019070-62b58980-f0fc-11e9-82fc-b9b67feade4e.gif)

## Wiki
Check the [wiki](https://github.com/MartijnKeesmaat/frontend-applications/wiki) for the process

## Development

Pull requests are encouraged and always welcome. [Pick an issue](https://github.com/sveltejs/svelte/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc) and help us out!

To install and work on Svelte locally:

```bash
git clone https://github.com/sveltejs/svelte.git
cd svelte
npm install
```

> Many tests depend on newlines being preserved as `<LF>`. On Windows, you can ensure this by cloning with:
> ```bash
> git -c core.autocrlf=false clone https://github.com/sveltejs/svelte.git
> ```

To build the compiler, and all the other modules included in the package:

```bash
npm run build
```

To watch for changes and continually rebuild the package (this is useful if you're using [npm link](https://docs.npmjs.com/cli/link.html) to test out changes in a project locally):

```bash
npm run dev
```

The compiler is written in [TypeScript](https://www.typescriptlang.org/), but don't let that put you off — it's basically just JavaScript with type annotations. You'll pick it up in no time. If you're using an editor other than [Visual Studio Code](https://code.visualstudio.com/) you may need to install a plugin in order to get syntax highlighting and code hints etc.


### Running Tests

```bash
npm run test
```

To filter tests, use `-g` (aka `--grep`). For example, to only run tests involving transitions:

```bash
npm run test -- -g transition
```


## svelte.dev

The source code for https://svelte.dev, including all the documentation, lives in the [site](site) directory. The site is built with [Sapper](https://sapper.svelte.dev). To develop locally:

```bash
cd site
npm install && npm run update
npm run dev
```

## Acknowledgments
TBD

## License

TBD
