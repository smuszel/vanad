### WIP

* [] advanced logger is implemented
* [] can choose bare, adv, silent verbosity
* [] work is spread evenly across the pools with regard to pool and underpooling

Test

* [] unit test history -> logger output
* [] when pool is higher than job count spin up nWorker === count
* [] when pool is lower than job count sip up nWorker === pool

* [] error handling for worker actions
* [] rcfile & pkgjson

### Advanced Logger

* registered spec files are are written out line by line: `abc.spec.js`
* during execution of spec file add animated spinner: `abc.spec.js /`
* on reaching step during the execution print out its label `abc.spec.js: xyz /`
* on succesful finish of test in spec file, print its name green: `abc.spec.js`
