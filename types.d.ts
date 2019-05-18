declare type Verbosity = 'basic' | 'silent'
declare type BrowserMode = 'headless' | 'remote' | 'preview'

declare type Dict<K, T> = { [k in K]: T }
declare type LoggerDict = Dict<Verbosity, Logger>

declare type Browser = import('puppeteer').Browser;

declare interface Logger {
    testStarted: (test: Test) => void,
    testEnded: (test: Test) => void,
    stepResolved: (stepTest: StepTest, err: ExpectationFailure) => void
}

declare interface Step {
    label: string,
    expect: () => Promise<ExpectationFailure?>
}

declare interface Test {
    name: string,
    (): AsyncIterableIterator<Step>
}

declare interface StepTest {
    step: Step
    test: Test
}

declare type TestFactory = (browser: Browser, data: any) => Test

declare interface ExpectationFailure {
    test: Test
    step: Step,
    value: any
}

declare interface TestExecutionOptions {
    verbosity: Verbosity
    mode: BrowserMode
    data: any
    testPath: string
    testName: string
}

declare interface PromiseGenConsumer<T> {
    (
        f: (value: T) => Promise<any>,
        it: AsyncIterableIterator<T>
    ): Promise<T[]>
}
