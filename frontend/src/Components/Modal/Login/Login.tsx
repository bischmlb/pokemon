import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input } from 'antd';
import React from 'react';
import { useSetRecoilState, Recoil } from '../../../Recoil';
import { fetchApi } from '../../../utils';
import { Modal } from '../Modal';
import './Login.scss';

interface ILogin {
    show: boolean;
    onClose: () => void;
}

export const Login: React.FC<ILogin> = (props) => {
    const setUser = useSetRecoilState(Recoil.User.Atom)

    const onFinish = (values: any) => {
        /* Validate user */
        fetchApi(
            'http://localhost:3001/user/validate', 
            'POST',
            JSON.stringify({email: values.username, password: values.password}))
            .then((res: any) => {
                /* Set user log in state to true */
                fetchApi(
                    `http://localhost:3001/user/${res.email}`, 
                    'PUT',
                    JSON.stringify({signedIn: true}))
                    .then((re) => {
                        setUser(res.email); props.onClose()})
                    })
      };
    

    return (
        <Modal
        {...props}
        width={300}
        title={
            <div className={'login-title-container'}>
                <div>
                    <FontAwesomeIcon style={{color: '#1677ff', fontSize: 102}} icon={faUserCircle} />
                </div>
                <div className={'login-title'}>
                    <span> Login </span>
                </div>

            </div>
        }
        >
        <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input style={{boxShadow: '0px 0 6px rgba(0,0,0,0.2)', background: 'inherit'}} placeholder={'example@email.com'} />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password style={{boxShadow: '0px 0 6px rgba(0,0,0,0.2)'}} placeholder={'*********'} />
                </Form.Item>

                <Form.Item style={{display: 'flex', justifyContent: 'center'}} >
                        <button className={'app-button'}> Login </button>
                </Form.Item>
            </Form>
        </Modal>
    )
}