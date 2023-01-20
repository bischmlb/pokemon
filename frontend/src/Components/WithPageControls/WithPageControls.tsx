import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Recoil } from '../../Recoil';
import { Create } from '../Modal/Create';
import { Login } from '../Modal/Login';
import { ThemeSwitch } from '../ThemeSwitch';
import './WithPageControls.scss'


/* Wrapper for page controls. Will include navigation handlers. */
export const WithPageControls: React.FC<{children: JSX.Element, maxPageCount?: number}> = ({children, maxPageCount}) => {
    const [page, setPage] = useRecoilState(Recoil.Page.Atom);
    const [maxPages, setMaxPages] = useState<number>();
    const [showCreate, setShowCreate] = useState(false);
    const user = useRecoilValue(Recoil.User.Atom);
    const darkmode = useRecoilValue(Recoil.DarkMode.Atom)


    /* Listen for changes in result capacity */
    useEffect(() => {setMaxPages(maxPageCount)}, [maxPageCount])

    const PageControls: React.FC = () => (
        <div style={{color: darkmode ? 'white' : 'inherit'}} className={'pagecontrols-container'}>
            <button style={{color: page === 1 ? '#999' : (darkmode ? 'white' : undefined)}} onClick={page > 1 ? () => setPage((curr) => curr-1) : undefined}>Previous page</button>
            <span>{page} / {maxPages}</span>
            {maxPages&&<button  style={{color: page === maxPageCount ? '#999' : (darkmode ? 'white' : undefined)}} onClick={page < maxPages ? () => setPage((curr) => curr+1) : undefined}>Next page</button>}
        </div>
    )

    return(
    <>
    <Create show={showCreate} onClose={() => setShowCreate(false)}/>
    <div className={'withpagecontrols-container'}>
      <div className={'withpagecontrols-container-left'}>
        {user&&<button onClick={() => setShowCreate(true)}><FontAwesomeIcon fontSize={24} icon={faCirclePlus} /><span style={{marginTop: 3, marginLeft: 5, fontWeight: 600, fontFamily: 'Poppins'}}>Create Pokémon</span></button>}
      </div>
      <div className={'withpagecontrols-container-center'}>
        <PageControls />
            {children}
        <PageControls />
      </div>
      <div className={'withpagecontrols-container-right'}>
        <ThemeSwitch />
      </div>
    </div>
    </>
    )
  }