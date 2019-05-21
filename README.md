### WIP

* [x] typed messages
* [x] do code todos
* [x] single concurrency mode -> use -t swich + package.json update
* [x] clear out typedef

* [] advanced logger
* [] worker pool
* [] error handling for worker actions
* [] enum-map of msg types
* [] rcfile & pkgjson

### Advanced Logger

* registered spec files are are written out line by line: `abc.spec.js`
* during execution of spec file add animated spinner: `abc.spec.js /`
* on reaching step during the execution print out its label `abc.spec.js: xyz /`
* on succesful finish of test in spec file, print its name green: `abc.spec.js`

### Debug Logger

* logs json of all passed messages
* use for tests