![](https://badgen.net/badge/%E2%96%B2%20Deploy%20to%20Now/$%20now%20martijnkeesmaat%2Ffrontend-applications/black)

![27a72acc257f89714964efb8dfe28f1f](https://user-images.githubusercontent.com/8048514/67623558-04d52000-f827-11e9-87e5-ff73643136e1.gif)

# 📸 Perspective

> Perspective is a project for the [frontend-applications course](https://github.com/cmda-tt/course-19-20/tree/master/frontend-applications) of the [Amsterdam University of Applied Sciences](https://www.hva.nl/)

The goal of the project is to dynamically display data with a front-end framework. My framework of choice is [Svelte](https://svelte.dev).

My concept is based around the early photographers who were able to tell a story through imagery instead of sketching or the written word. I want to educate other by placing them behind the lens. They will take snapshots of certain important moments in history. These snapshots will be combined with data from the [Tropen Museum](https://www.tropenmuseum.nl/) into an storytelling website.


## At its core
The basic flow revolves around two pages. 
1. A video in which users are challenged to make the perfect snapshot
2. These are then displayed on the result page along with a story

### 1. Snapshots  
![89e2c58bcb7e7fcdbbf9d1d66f7ae356](https://user-images.githubusercontent.com/8048514/67623677-72358080-f828-11e9-8df8-6c20e2676cf0.gif)

![0f3106ff191293a1b8b9cd104ed128ed](https://user-images.githubusercontent.com/8048514/67623655-27b40400-f828-11e9-8fbc-2a4ab1c3127d.gif)

### 2. Result
![1506bec30d90e37b527198c3c9873ccc](https://user-images.githubusercontent.com/8048514/67623822-0522ea80-f82a-11e9-8bd7-0c414fe60e51.gif)


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
