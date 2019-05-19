### WIP

* [] add / refactor offline tests
* [] add coloring to logger output
* [] lift logging to higher scope
* [] .env generator
* [] check if env vars are applied correctly
* [] use incognito contexts :P


worker pool -> each has browser -> each can acccept job -> each notifies job progress
-> broker disperses jobs to idle workers

### Clustering
* in future rework spec file handling by giving to queue of workers
* inspired by https://github.com/thomasdondorf/puppeteer-cluster
* use more functional approach
* use child process for perf gains
* implement profiler for concurrency levels and implementations