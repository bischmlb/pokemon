import { Modal } from '../Modal';
import React from 'react';
import './Delete.scss';
import { fetchApi } from '../../../utils';
import { Recoil, useRecoilValue } from '../../../Recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


interface IDelete {
    show: boolean;
    onClose: () => void;
    deleteId: number;
}


export const Delete: React.FC<IDelete> = (props) => {
    const user = useRecoilValue(Recoil.User.Atom);

    const onFinish = () => {
        fetchApi<{id: number, email: string, password: string, signedIn: boolean}>(`http://localhost:3001/user/${user}`, 'GET')
            .then((res) => {
                if(res.signedIn){
                    fetchApi<any>(`http://localhost:3001/pokemon/${props.deleteId}`, 
                    'DELETE')
                        .then((res) => {console.log(res); props.onClose()})
                } else {
                    console.log('not permitted')
                }
            })
      };



    return(
        <Modal
            {...props}
            width={350}
            title={
                <div className={'delete-title-container'}>
                    <div className={'delete-title'}>
                        <FontAwesomeIcon size='8x' color={'red'} icon={faTriangleExclamation} />
                        <p> DELETE POKÉMON? </p>
                        <span> Are you sure you want to delete the Pokemon from your list? This action is irreversible. </span>
                    </div>
                </div>
            }
            >
            <div className={'modal-delete-content'}>
                <button onClick={() => onFinish()} className={'app-button-delete'}> Create </button>
            </div>


            </Modal>
    )

}