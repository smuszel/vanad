declare type Browser = import('puppeteer').Browser
declare type BrowserContext = import('puppeteer').BrowserContext
declare type Page = import('puppeteer').Page

declare type Dict<K, T> = { [k in K]: T }
declare type OptDict<K, T> = { [k in K]?: T }
declare type ParamsOf<T> = T extends (... args: infer T) => any ? T : never;
declare type ReturnOf<T> = T extends (... args: any[]) => infer T ? T : never; 

declare type MessageType = keyof typeof import('./src/messages')
// todo move to constants
declare type VerbosityLevel = 'debug' | 'silent' | 'bare'
declare type BrowserMode = 'headless' | 'remote' | 'preview'
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

declare interface PathTestGenerator { }
declare type Job = {
    data: any
    path: PathTestGenerator
    name: string
}

declare type Message = {
    type: MessageType
    name: string
}

declare type TestGenerator<T> = ({ context: BrowserContext, data: T }) => AsyncIterableIterator<Step>
declare type Chanel = (msg: Message) => void
declare type Worker = (chanel: Chanel, job: Job) => Promise<void>
declare type Step = boolean

interface Assert {
    <T>(given: T, whenThen: [ParamsOf<T>, ReturnOf<T>][]): void
}