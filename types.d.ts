declare type Dict<K, T> = { [k in K]: T }
declare type OptDict<K, T> = { [k in K]?: T }
declare type Browser = import('puppeteer').Browser
declare type Page = import('puppeteer').Page
declare type VerbosityLevel = 'debug' | 'silent' | 'bare'
declare type BrowserMode = 'headless' | 'remote' | 'preview'
declare type MessageType = keyof typeof import('./src/messages')
declare type ArgVars = {
    verbosity: VerbosityLevel
    browser: BrowserMode
    threads: number | boolean
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

declare type Message = {
    type: MessageType
    value?: any
}

declare type Worker = (job: Job) => AsyncIterableIterator<MessageType>
declare type JobExecution = (job: Job) => Promise<void>
declare type Query = () => Promise<QueryFailure?>
declare type QueryFactory<A, B> = (a: A, b: B) => Query
declare interface Step {
    label: string,
    expect?: Query
}
declare type TestFactory<T> = (browser: Browser, data: T) => TestGen
declare type TestGen = () => AsyncIterableIterator<Step>

//

declare type Middleware = { [k in MessageType]?: (...args: any[]) => Promise<number> }

//
