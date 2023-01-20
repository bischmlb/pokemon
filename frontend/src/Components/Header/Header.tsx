/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import './Header.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faSearch, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { Dropdown } from 'antd';
import Input from 'antd/es/input';
import { Recoil, useRecoilState, useRecoilValue } from '../../Recoil';
import { Login } from '../Modal/Login';
import { fetchApi } from '../../utils';


export const Header: React.FC = () => {
    const [results, setResults] = useRecoilState(Recoil.Results.Atom)
    const [sortFunc, setSortFunc] = useState<'A-Z' | 'Z-A' | 'Weight' | 'Height'>('A-Z');
    const [showModal, setShowModal] = useState(false);
    const [user, setUser] = useRecoilState(Recoil.User.Atom);
    const darkmode = useRecoilValue(Recoil.DarkMode.Atom)


    const logOut = () => {
        fetchApi(
            `http://localhost:3001/user/${user}`, 
            'PUT',
            JSON.stringify({signedIn: false}))
            .then(() => {
                setUser(undefined)})
            }

    const itemsResult = [
        {
            key: '1',
            label: (
              <a onClick={() => setResults(10)}>
                Show 10 results
              </a>
            ),
          },
          {
            key: '2',
            label: (
              <a onClick={() => setResults(20)}>
                Show 20 results
              </a>
            ),
          },
          {
            key: '3',
            label: (
              <a onClick={() => setResults(50)}>
                Show 50 results
              </a>
            ),
          },
    ]

    const itemsSort = [
        {
            key: '1',
            label: (
              <a onClick={() => setSortFunc('A-Z')}>
                From A-Z
              </a>
            ),
          },
          {
            key: '2',
            label: (
                <a onClick={() => setSortFunc('Z-A')}>
                  From Z-A
                </a>
              ),
          },
          {
            key: '3',
            label: (
                <a onClick={() => setSortFunc('Height')}>
                  By Height
                </a>
              ),
          },
          {
            key: '4',
            label: (
                <a onClick={() => setSortFunc('Weight')}>
                  By Weight
                </a>
              ),
          },
    ]

    return <>
    <Login onClose={() => setShowModal(false)} show={showModal}/>
    <div className={'header-container'}>
        <div className={'header-container-left'}>
        </div>
        <div className={'header-container-center'}>
                <Dropdown  trigger={['click']} menu={{items: itemsResult}}> 
                    <a className={'dropdown'}>
                        <span className={'left'}>Showing {results} results</span> 
                        <span className={'right'}><FontAwesomeIcon className={'faIcon'} color={'#1677ff'} icon={faAngleDown} /></span>
                    </a>
                </Dropdown>
                <Input className={'input'} placeholder="Search Terms" prefix={<FontAwesomeIcon color={'#1677ff'} icon={faSearch} />} />
                <Dropdown trigger={['click']} menu={{items: itemsSort}}> 
                    <a className={'dropdown'}>
                        <span className={'left'}>Sort items: {sortFunc}</span> 
                        <span className={'right'}><FontAwesomeIcon className={'faIcon'} color={'#1677ff'} icon={faAngleDown} /></span>
                    </a>
                </Dropdown>      
        </div>
        <div className={'header-container-right'}>
            <div className={'login-container'}>
                <button onClick={user ? () => logOut() : () => setShowModal(true)} className={'app-button login'} style={{ border: darkmode ? '1px solid #fff' : undefined, color: darkmode ? 'white' : undefined}}>
                    <p>{user ? 'Logout' : 'Login'}</p>
                    <FontAwesomeIcon style={{marginLeft: 10, fontSize: 18}} icon={faUserCircle} />
                </button>
            </div>
        </div>
    </div>
    </>
}