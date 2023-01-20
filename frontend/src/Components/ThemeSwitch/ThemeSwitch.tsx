import React from 'react';
import { Switch } from 'antd'
import { Recoil, useRecoilState } from '../../Recoil';


export const ThemeSwitch: React.FC = () => {
    const [darkmode, setDarkMode] = useRecoilState(Recoil.DarkMode.Atom)
    return (  
        <div style={{whiteSpace: 'nowrap'}}>
            <span>Light Mode</span>
                <Switch onChange={() => setDarkMode(!darkmode)} checked={darkmode} style={{margin: '0px 10px'}} size={'small'} />
            <span>Dark Mode</span>
        </div>
    )
}