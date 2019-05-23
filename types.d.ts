declare type Browser = import('puppeteer').Browser
declare type BrowserContext = import('puppeteer').BrowserContext
declare type Page = import('puppeteer').Page
declare type Dict<K, T> = { [k in K]: T }
declare type OptDict<K, T> = { [k in K]?: T }
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

interface NodeRequire {
    (id: PathTestGenerator): TestGenerator<any>
}

declare type StdoutRender = (value: any) => void
declare interface PathTestGenerator { }
declare type Job = {
    data: any
    path: PathTestGenerator
    name: string
}

declare type Message = {
    type: MessageType
    data: {
        job?: Job,
        name?: string
    }
}
declare type TestGenerator<T> = ({ context: BrowserContext, data: T }) => AsyncIterableIterator<Step>
declare type Chanel = (msg: Message) => void
declare type Worker = (chanel: Chanel, job: Job) => Promise<void>
declare type Step = boolean
