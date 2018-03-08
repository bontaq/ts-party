This assumes you have web-dev-server installed.

If you don't, please run:
npm install web-dev-server --save-dev

then run:
npm run start:dev

in the root directory of this project (hope this works)

then navigate to localhost:8080/patients (Or just click on
patients / appointments)

TBH I'm not sure why react router isn't redirecting from /, although
you can see what I attempted to do in Routes.tsx.  Update:
No seriously, react-router isn't working for a damn unless you
click through the links.  I'm not sure why I trusted them this time
around, they've changed APIs 4 times in less years so I would recommned
not using them for routing.


Anyways, how to read this lil code base:
- Start at index.tsx, there's some pretty fire wildness there
- Then onto Routes.tsx, that's got navigation and the pages
- The pages directory contains each page
- __tests__ contains the bb test, althought I prefer files to be
- next to whatever they're testing.


Let me know if you run into trouble running it, as I think this
is alright project wise but dang if it ain't the worst when
something doesn't run.
