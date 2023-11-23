# gem.ini

> experimental react adventure game engine

## Games
- homepage: https://www.rudowscy.com
- Trader of Stories - chapter 3 powered by this engine: https://www.rudowscy.com/tos3

## License
game assets (music, images, text) and story are small part of original game.
There are copyrighted and shouldn't be used outside this repo

To enjoy full game please visit https://www.rudowscy.com

## History
- gem.ini engine is based on my older works that power our previous games in this series

## Main assumptions
- sass for globals and inline styling where needed (positions, bg images etc.)
- for fun, learn and to help my bro again<br />

- this time without https://www.styled-components.com/
- and still without https://tailwindcss.com/

# System requirements

- node 16.13.1
  - best with windows version switcher: https://github.com/coreybutler/nvm-windows
  - mac/linux: https://github.com/nvm-sh/nvm
  ```
  nvm install 16.13.1
  nvm use 16.13.1
  ```
- yarn 1.22.19 or some later classic version (https://classic.yarnpkg.com/en/docs/install)
  ```
  npm install --global yarn
  ```
- Windows problem: `ps1 cannot be loaded because running scripts is disabled on this system`
  Solution: https://stackoverflow.com/questions/41117421/ps1-cannot-be-loaded-because-running-scripts-is-disabled-on-this-system


# Developing

```
yarn
yarn start
```

Runs the app in the development mode.<br />
Open [http://localhost:3003](http://localhost:3003) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## helpful IDE settings

- turn on `eslint` on save
- turn on `prettier` on save
- go to `tools -> save on actions` options and set `arrange imports`

## Run in debugMode

Open [http://localhost:3003/?debugMode=true](http://localhost:3003/?debugMode=true)


## Tools

### image optimization

https://www.smashingmagazine.com/2022/07/powerful-image-optimization-tools/
https://tinypng.com/

### css clip path generator

https://www.cssportal.com/css-clip-path-generator/
https://webdevpuneet.com/tools/css-clip-path-generator/
https://bennettfeely.com/clippy/

### webm audio converter

https://www.freeconvert.com/mp3-to-webm
https://www.videoconverter.com/convert-mp3-to-webm.html (1 per day)
https://www.video2edit.com/convert-to-webm

- - -

# Test

`yarn test`

TBC
Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Build

`yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Preview build

```
yarn global add serve
serve build
```
