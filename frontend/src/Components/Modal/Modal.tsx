import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Recoil, useRecoilValue } from '../../Recoil';
import './Modal.scss';

interface IModal {
    children: JSX.Element;
    show: boolean;
    width?: number;
    title?: JSX.Element;
    buttons?: JSX.Element[];
    onClose: () => void;
}

export const Modal: React.FC<IModal> = (props) => {
    const darkmode = useRecoilValue(Recoil.DarkMode.Atom)

    if(!props.show) {
        return null;
    }

    return (
    <div className={'modal'} >
        <div className={'modal-content'} style={{width: props.width ? props.width : undefined}}>
            <div className={'modal-header'}>
                <button onClick={props.onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <div className={'modal-title'}>
                {props.title}
            </div>
            <div className={'modal-body'}>
                {props.children}
            </div>
            {props.buttons&&
            <div className={'modal-footer'}>
                {props.buttons.map((button) => button)}
            </div>
            }
        </div>
    </div>
    )
}