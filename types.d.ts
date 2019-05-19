declare type Dict<K, T> = { [k in K]: T }
declare type Dict2<A, B, C> = Dict<A, Dict<B, C>>
declare type Browser = import('puppeteer').Browser
declare type Page = import('puppeteer').Page
declare type EE = import('events').EventEmitter
declare type VerbosityLevel = 'basic' | 'silent' | 'bare'
declare type BrowserMode = 'headless' | 'remote' | 'preview'
declare type ConcurrencyMode = 'none' | 'threads'
declare type MessageType = 'testStart' | 'testEnd' | 'stepSuccess' | 'stepFailure' | 'finished'
declare type ArgVars = {
    verbosity: VerbosityLevel
    concurrency: ConcurrencyMode
    browser: BrowserMode
    pool: number
    cwd: string
    data: any
    pattern: string
}

declare type StdoutRender = (value: any) => void

declare type Job = {
    data: any
    path: string
    name: string
}

declare type WorkerHandle = EE & { send: any }
declare type Worker = (opt: { mode: BrowserMode, emitter: EE }) => JobExecution
declare type JobExecution = (job: Job) => Promise<void>
declare type Query = () => Promise<QueryFailure?>
declare type QueryFactory<A, B> = (a: A, b: B) => Query

//

declare type Middleware = { [k in MessageType]?: (...args: any[]) => Promise<number> }

// todo CLEAR COMMENTS!

// declare type BrowserPool = {
//     concurrency: ConcurrencyMode,
//     mode: BrowserMode
//     n: number
// }

// declare interface QueryFailure {
//     type: string,
//     value: any
// }

// declare type Logger = Dict<Message, Present>

// declare interface Step {
//     label: string,
//     expect?: Query
// }

// declare interface Test {
//     name: string,
//     gen: TestGen
// }

// declare interface StepTest {
//     step: Step
//     test: Test
// }

// declare type TestFactory<T> = (browser: Browser, data: T) => TestGen

// declare type TestGen = () => AsyncIterableIterator<Step>

// declare interface TestExecutionOptions<T> {
//     verbosity: Verbosity
//     mode: BrowserMode
//     debug: boolean
//     path: string
//     name: string
//     data: T
// }

// declare interface PromiseGenConsumer<T> {
//     (
//         f: (value: T) => Promise<any>,
//         it: AsyncIterableIterator<T>
//     ): Promise<T[]>
// }

// declare type Pure<A, R> = (arg: A) => R 

// declare type ExecutionConfig = {
//     logger: Logger,
//     cluster: Cluster,
//     jobs: Job[]
// }

// declare type Cluster = import('events').EventEmitter
