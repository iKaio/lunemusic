export function MoveInArray(arr: any[], at: number, direction: number): number {
    let rounds = Math.floor((at+direction) / arr.length);
    return (at+direction) - (arr.length * rounds);
}

export function Test() {
    let arr = [0, 1, 2, 3, 4, 5, 6, 7];
    return <h1>{MoveInArray(arr, 3, -5)}</h1>
}