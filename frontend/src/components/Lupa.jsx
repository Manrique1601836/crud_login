
import { Search } from "lucide-react"
import { User } from 'lucide-react';

import { Sun } from 'lucide-react';
import { Moon } from 'lucide-react';

import { useState } from "react";

export default function Lupa(){

    const [ tema , setTema ] = useState(false);

    return(

        <div className="lupa">
            <div className="mode">
                <button onClick={() => setTema(!tema)}>
                    { tema ? <Moon/> : <Sun/> }
                </button>
            </div>

            <div className="buscador">
                <User/>
                <input type="search" placeholder=' buscar '/>
            </div>
        </div>

    )
}