function removeRandomLetter(str:string):string {
    var pos = Math.floor(Math.random()*str.length);
    return str.substring(0, pos)+str.substring(pos+1);
}

function addRandomString(str:string):string {
    let pos = Math.floor(Math.random()*str.length)
    return str.substring(0,pos)+Math.random().toString(36)[3]+str.substring(pos,str.length-1)
}

function shaffleString(str:string):string {
    return str.split(' ').sort(()=>Math.random()-.5).join(' ');
}

export const mistakeArray = [removeRandomLetter, addRandomString, shaffleString]