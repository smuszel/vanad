declare type Browser = import('puppeteer').Browser
declare type BrowserContext = import('puppeteer').BrowserContext
declare type Page = import('puppeteer').Page
declare type MessageType = keyof typeof import('./src/constants').MessageType
declare type VerbosityLevel = keyof typeof import('./src/constants').VerbosityLevel
declare type BrowserMode = keyof typeof import('./src/constants').BrowserMode

declare type Dict<K, T> = { [k in K]: T }
declare type OptDict<K, T> = { [k in K]?: T }
declare type Defined = string | number | boolean | object

interface NodeRequire {
    (id: PathTestGenerator): TestGenerator<any>
}

declare type ArgVars = {
    verbosity: VerbosityLevel
    browser: BrowserMode
    threads: number | boolean
    cwd: string
    data: any
    pattern: string
}

declare type State = {
    done: Message[],
    queued: Message[],
    tracked: Message[],
}

declare type Message = {
    type: MessageType
    settled?: boolean
    value?: any
}

declare type Job = {
    data: any
    path: PathTestGenerator
    name: string
}


declare type TestGenerator<T> = (init: { context: BrowserContext } & T) => AsyncIterableIterator<any>
declare interface PathTestGenerator { }
declare type Chanel = (msg: Message) => void
declare type JobExecution = (chanel: Chanel, job: Job) => Promise<void>
declare type Plugin = OptDict<MessageType, [(value: any) => any, MessageType?]>
declare type Split = <T>(f: (x: T) => T | undefined, xs: T[]) => [T[], T[]]

// declare type Box<T> = ()
// declare type Loggers = Dict<VerbosityLevel, () => (end: boolean, history: Message[]) => void>

