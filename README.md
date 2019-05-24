### 0.0.1 checklist
#### Consider adding the reason for failure

* [] advanced logger - Li
* [] silent & minimum loggers - Li
* [] error handling for worker actions - Fe
* [] rcfile & pkgjson - C
* [] organize dev utlis - C
* [] additional example / test organize / README - Fe
* [] clean up messages/dead code - H
* [] runend refactor - Li
* [] revisit types - Li

### Advanced Logger

* [x] registered spec files are are written out line by line: `abc.spec.js`
* [x] during execution of spec file add animated spinner: `abc.spec.js /`
* [x] on reaching step during the execution print out dots equal to index + 1 `abc.spec.js: . . /`
* [] on succesful finish of test in spec file, print its name green: `abc.spec.js`
* [] on failure finish of test in spec file, print its name red: `abc.spec.js . . !`
* [] render with newlines top + bottom
