export function MoveInArray(arr: any[], at: number, direction: number): number {
    
    // Formula
    // dir - len * fl(dir / len) - at

    // Positive direction example

    // len: 4
    // ["cat", "dog", "monke", "car"]
    //    0      1       2       3
    //        +7 ^       ^

    // 7 - 4 * 1 - 2 = 1
    
    // Negative direction example

    // len: 4
    // ["cat", "dog", "monke", "car"]
    //    0      1       2       3
    //        -5 ^       ^

    // -5 -2 -8

    if (Math.sign(direction) == +1) {
        let rounds = Math.floor(direction / arr.length);
        return direction - (arr.length * rounds) - at;
    } else {
        let rounds = Math.floor(direction / arr.length);
        return (direction - at) + Math.abs(arr.length * rounds);
    }
}