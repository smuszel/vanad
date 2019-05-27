type Assert = <T>(given: T, whenThen: Dict<string, UncurryParamsReturn<T>> | UncurryParamsReturn<T>[]) => void

type FinalReturnType<T> =
    T extends ((...args: any[]) => infer R1)
    ? R1 extends ((...args: any[]) => infer R2)
    ? R2 extends ((...args: any[]) => infer R3)
    ? R3 : R2 : R1 : never

type MergeTuple<A, B, C> =
    A extends [infer A1, infer A2]
        ? B extends [infer B1, infer B2]
            ? C extends [infer C1, infer C2] ? [A1, A2, B1, B2, C1, C2]
            : C extends [infer C1] ? [A1, A2, B1, B2, C1] : [A1, A2, B1, B2]
        : B extends [infer B1]
            ? C extends [infer C1, infer C2] ? [A1, A2, B1, C1, C2]
            : C extends [infer C1] ? [A1, A2, B1, C1] : [A1, A2, B1]
        : [A1, A2]
    : A extends [infer A1]
        ? B extends [infer B1, infer B2]
            ? C extends [infer C1, infer C2] ? [A1, B1, B2, C1, C2]
            : C extends [infer C1] ? [A1, B1, B2, C1] : [A1, B1, B2]
        : B extends [infer B1] 
            ? C extends [infer C1, infer C2] ? [A1, B1, C1, C2]
            : C extends [infer C1] ? [A1, B1, C1] : [A1, B1]
        : [A1]
    : B extends [infer B1, infer B2]
        ? C extends [infer C1, infer C2] ? [B1, B2, C1, C2]
        : C extends [infer C1] ? [B1, B2, C1] : [B1, B2]
    : B extends [infer B1]
        ? C extends [infer C1, infer C2] ? [B1, C1, C2]
        : C extends [infer C1] ? [B1, C1] : [B1]
    : C extends [infer C1, infer C2] ? [C1, C2]
    : C extends [infer C1] ? [C1]
    : []

type UncurryParamsReturn<T> =
    T extends ((...args: infer A1) => infer R1)
    ? UP<R1> extends ((...args: infer A2) => infer R2)
    ? UP<R2> extends ((...args: infer A3) => infer R3)
    ? [MergeTuple<A1, A2, A3>, UP<R3>, (() => boolean)?]
    : [MergeTuple<A1, A2, []>, UP<R2>, (() => boolean)?]
    : [A1, UP<R1>, (() => boolean)?]
    : never

type UP<T> = T extends Promise<infer X> ? X : T

type H0 = number
type H1 = (x: number) => string
type H2 = (x: number) => (y: number) => string
type H3 = (x: number) => (y: number) => (z: number) => string
type H4 = (x: number, y: number, z: number) => string
type H5 = (y: number, q: number) => (z: number) => string
type H6 = (x: number) => (y: number, q: number) => string
type H7 = (x: number) => (y: number, q: number) => (z: number) => string

type UH0 = UncurryParamsReturn<H0>
type UH1 = UncurryParamsReturn<H1>
type UH2 = UncurryParamsReturn<H2>
type UH3 = UncurryParamsReturn<H3>
type UH4 = UncurryParamsReturn<H4>
type UH5 = UncurryParamsReturn<H5>
type UH6 = UncurryParamsReturn<H6>
type UH7 = UncurryParamsReturn<H7>

type MT0 = MergeTuple<[string, string], [number, number], [object, object]>
type MT1 = MergeTuple<[string, string], [number, number], [object]>
type MT2 = MergeTuple<[string, string], [number, number], []>
type MT3 = MergeTuple<[string, string], [number], [object, object]>
type MT4 = MergeTuple<[string, string], [], []>
type MT5 = MergeTuple<[string], [number, number], [object, object]>
type MT6 = MergeTuple<[string], [number, number], [object, object]>
type MT7 = MergeTuple<[], [number, number], [object, object]>
type MT8 = MergeTuple<[string], [number], [object]>
type MT8_5 = MergeTuple<[string], [number, number], [object]>
type MT9 = MergeTuple<[], [], [object]>
type MT9_5 = MergeTuple<[], [], [object, object]>
type MT10 = MergeTuple<[], [number, number], [object, object]>
type MT11 = MergeTuple<[string], [number], []>
type MT12 = MergeTuple<[], [], []>