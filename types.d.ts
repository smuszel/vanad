declare type Verbosity = 'basic' | 'silent'
declare type BrowserMode = 'headless' | 'remote' | 'preview'

declare type Dict<K, T> = { [k in K]: T }
declare type LoggerDict = Dict<Verbosity, Logger>

declare type Browser = import('puppeteer').Browser;
declare type Page = import('puppeteer').Page;

declare type Query = () => Promise<QueryFailure?>
declare type QueryFactory<A, B> = (a: A, b: B) => Query

declare interface QueryFailure {
    type: string,
    value: any
}

declare interface Logger {
    testStarted: (test: Test) => void,
    testEnded: (test: Test) => void,
    stepResolved: (stepTest: StepTest, err: ExpectationFailure) => void
}

declare interface Step {
    label: string,
    expect?: Query
}

declare interface Test {
    name: string,
    gen: TestGen
}

declare interface StepTest {
    step: Step
    test: Test
}

declare type TestFactory<T> = (browser: Browser, data: T) => TestGen

declare type TestGen = () => AsyncIterableIterator<Step>

declare interface RunnerConfig<T> {
    verbosity: Verbosity
    mode: BrowserMode
    debug: boolean
    specFiles: { path: string, name: string }[]
    data: T
}

declare interface TestExecutionOptions<T> {
    verbosity: Verbosity
    mode: BrowserMode
    debug: boolean
    path: string
    name: string
    data: T
}

declare interface PromiseGenConsumer<T> {
    (
        f: (value: T) => Promise<any>,
        it: AsyncIterableIterator<T>
    ): Promise<T[]>
}
