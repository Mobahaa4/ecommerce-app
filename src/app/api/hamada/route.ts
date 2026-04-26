// api/API   GET POST PUT DELETE

import { NextRequest, NextResponse} from "next/server";

export function GET( req : NextRequest  ){
    const users = [
        {name : "Ahmed", age : 20},
        {name : "Mohamed", age : 25},
        {name : "Bahaa", age : 27},
        {name : "Youssef", age : 30}
    ]

    return NextResponse.json( users )
}