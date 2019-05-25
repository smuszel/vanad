### 0.0.1 checklist

* [] advanced logger - Li
* [] minimum - Li
* [] error handling for worker actions - Fe
* [] rcfile & pkgjson - C
* [] organize dev utils - C
* [] additional example / test organize / README - Fe
* [] clean up messages/dead code - H
* [] runend refactor - Li
* [] revisit types - Li
* [] travis CI - Li
* [] lint - Li
* [] npm ignore - H

### Docs

* [] there is examples folder
* [] it contains subfolder for each example
* [] examples: HW, successful register (threads), failed admin login, errored register
* [] in each subfolder: index.html, name.spec.js[], shell script
* [] i can preview with `yarn example` -> inquire example name -> inquire headlessness
* [] the tests run these examples to match a snapshot of output

* [] The Gif
* [] Philosophy
* [] Example spec
* [] Cli options
* [] Helper lib doc

### Minimum Logger

* [] chosen by verbosity
* [] on success emits nothing
* [] no spinner
* [] on error throws that error
* [] on fail emits the name of file with step number 

### Advanced Logger

* [x] registered spec files are are written out line by line: `abc.spec.js`
* [x] during execution of spec file add animated spinner: `abc.spec.js /`
* [x] on reaching step during the execution print out dots equal to index + 1 `abc.spec.js: . . /`
* [] on succesful finish of test in spec file, print its name green: `abc.spec.js`
* [] on failure finish of test in spec file, print its name red: `abc.spec.js . . !`
* [] on error throws that error
* [] render with newlines top + bottom
* [] chosen by verbosity