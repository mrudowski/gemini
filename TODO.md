# TODO

- testowanie na słabym łączu

- wywalic acorns z inv, salomona z aktorow i teacup z scen (i cos z tłumaczen pl)

- TEST na ipadzie/telefonie:
- Use pointer instead of mouse events for better compatibility on touch screens ???
  https://github.com/szhsin/react-menu/pull/660
  gem TAP? zamiast onclick? (- onToucheEnd?)

-------------------

- selector getSceneState is not ts - not helps us!

- add switch light effect componentns to closup too
- add light off to scene as par of the scene - not overlay

- add alternative portrait name

- precaching music/sounds - preloader dzwieków?

- co z currentPoi wiszacym? - przydaje sie w useWith

- ~~end game / reset state etc / podobne do new game?~~ - end game nie robi nic - wciaz mamy autosave z koncowka i tyle

- inventory i notebook i herbarium maja wiele wspolnego z closeup, a jak nie nawet - to same ze sobą
  fajnie by było je stworzyć w oparciu o template - aby np mapa czy cokolwiek szybciej się tworzyło

- should mainMenu goes to engine or be in game?
  - probably in engine like other guis: inventory, dialog etc

- POWINISMY miec defaulty blisko definicji akcji! (a mymy dopiero w komponentach)

all as functions? -- like useState(() => {}); -- for performance?

- waitAfter waitBefore as common action params?
- autoPlayAfter for every action - nextAfter: 'click', nextAfter: 1 |
  - different default for every action
  - talk - nextAfter: 'click'
  - setState/wait etc: nextAfter: 1
  - etc

- loadery na slow 3g --- wgrywanie sceny na scenie... powinno byc ciemno tlo i loader? - moze lock border wystarczy

- ui hud - powinien pojawic sie po animacji/razem z animacją sceny - nie przed
- wiecej lockow!

- tipsy i triki z TeaShop:
```
ACTIONS.talk({text: 'testing autoplay 1...', autoPlayAfter: 3}),
ACTIONS.playSound({sound: SOUNDS.knock})
ACTIONS.talk({text: 'Be careful with this old man :)', actor: ACTORS.gofung, actorName: getGofungName()}),

hotspot={{
  clipPath: 'polygon(62% 4%, 86% 42%, 75% 95%, 16% 79%, 13% 58%, 39% 4%)',
}}

<Scene
  sounds={[SOUNDS.cityMusic, SOUNDS.stream]}
>
```

- - - - - - - - - - - - - - - - - - - -

# Dreams

- inspired by roblox
  - lista poi w danej lokacji?
  - i sprawdzenie jakie mają akcję?

- podgląd wielu scene naraz
- za pomocą https://reactflow.dev/
- zmiana języka w każdym momencie i na naszych oczach... wyświetlenie wielu na raz?

- wizualizacja dialogów
  - reagująca na stan (modifikująca swoje powiązania kolejność)
  - pokazująca rozgałęzienia
  - pokazującą bieżącą pozycję (ukryte opcje i ścieżki)


# Put to readme
- https://github.com/goldfire/howler.js#options
https://freesound.org/search/?q=click
https://creativecommons.org/publicdomain/zero/1.0/deed
  http://www.twinmusicom.org/
- 

## caching image
https://css-tricks.com/pre-caching-image-with-react-suspense/
https://codesandbox.io/s/react-suspense-img-ly38r?file=/src/App.js:864-879

## voice maker
https://voicechanger.io/voicemaker/#!/{%22effects%22:[{%22name%22:%22longEcho%22,%22params%22:{%22wetGain%22:1,%22dryGain%22:1}}],%22version%22:1}
https://voicemaker.in/
https://voicegenerator.io/

### warn
https://www.framer.com/docs/guide-upgrade/##esm-and-create-react-app

LEARN
===============================

- filter: blur(4px);

- divide it into many files with imports and exports
- maybe scene should be just object not component?

- craco image optimised - css images?



// ---------------- check

need ReactDOM.createRoot() and react 18 alpha
https://pl.reactjs.org/docs/concurrent-mode-patterns.html#transitions

https://github.com/alexreardon/memoize-one
https://github.com/elbywan/hyperactiv
https://github.com/grischaerbe/cacheables

console.assert()
console.table()

2d:
https://github.com/KilledByAPixel/LittleJS

wow music
https://killedbyapixel.github.io/ZzFX/
https://keithclark.github.io/ZzFXM/

wow translators
https://warlocs.com/
