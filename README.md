### EE architecture

* state being immutable makes things easier to split & test
* plugin based architecture enforces minimal coupling
* concept > interfaces > typings > tests > implementation

* make unit tests for each submodule
* create event loop that updates computation state
* track messages that are async and ones that are history
* make loop tick query for fulfilled messages
* enable plugins to access all message history 
* notify plugins that new messages are put onto the history 
* utilize selectors to build accessible structure from normalized message history

### Plugins

* [] logger
* [] scheduler
* [] executions

### 0.0.1 checklist

* [] advanced logger
* [] minimum
* [] error handling for worker actions
* [] rcfile & pkgjson
* [] organize dev utils
* [] additional example / test organize / README
* [] travis CI
* [] lint
* [] npm ignore

### Docs

* [x] there is examples folder
* [x] it contains subfolder for each example : HW, successful register (threads), failed admin login
* [x] in each subfolder: index.html, name.spec.js[], shell script
* [] i can preview with `yarn example` -> inquire example name -> inquire headlessness
* [] the tests run these examples to match a snapshot of output

* [] The Gif
* [] Philosophy
* [] Example spec
* [] Cli options
* [] Helper lib doc
