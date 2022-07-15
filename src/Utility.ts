export function MoveInArray(arr: any[], at: number, direction: number): number {
    
    // len: 4
    // ["cat", "dog", "monke", "car"]
    //    0      1       2       3
    //        +7 ^       ^
    
    
    // len: 6
    // ["cat", "dog", "monke", "car", "hep", "sip"]
    //    0      1       2       3      4      5
    //    ^           +8 ^
    
    
    // len: 8
    // ["cat", "dog", "monke", "car", "hep", "sip", "des", "kop"]
    //    0      1       2       3      4      5      6      7
    //    ^           +10 ^
    
    // len: 9
    // ["cat", "dog", "monke", "car", "hep", "sip", "des", "kop", "kus"]
    //    0      1       2       3      4      5      6      7      8
    //    ^           +11 ^

    let rounds = Math.floor(direction / arr.length); // 1
    return direction - (arr.length * rounds) - at; // 7 - 4 - 2 = 1
}