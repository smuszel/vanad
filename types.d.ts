declare type Caller = {
    filePath: string;
    line: number;
    stack: string;
};

declare type Testcase = {
    caller: Caller;
    title: string;
};
