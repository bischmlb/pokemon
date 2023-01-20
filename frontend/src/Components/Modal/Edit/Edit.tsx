import { Form, Input, Upload } from 'antd';
import { Modal } from '../Modal';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import './Edit.scss';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload';
import { fetchApi } from '../../../utils';
import { Recoil, useRecoilValue } from '../../../Recoil';


interface IEdit {
    show: boolean;
    onClose: () => void;
}


export const Edit: React.FC<IEdit> = (props) => {
    const [imageUrl, setImageUrl] = useState<string>();
    const pokemon = useRecoilValue(Recoil.Pokemon.Atom)
    const user = useRecoilValue(Recoil.User.Atom);

    const onFinish = (values: {name: string, height: number, weight: number}) => {
        fetchApi<{id: number, email: string, password: string, signedIn: boolean}>(`http://localhost:3001/user/${user}`, 'GET')
        .then((res) => {
            if(res.signedIn){
                console.log(values)
                fetchApi<any>(`http://localhost:3001/pokemon/${pokemon?.id}`, 
                'PUT',
                 JSON.stringify({...values}))
                    .then((res) => {console.log(res); props.onClose()})
            } else {
                console.log('not permitted')
            }
        })
      };

      const uploadButton = (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

      const getBase64 = (img: RcFile, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
      };

      const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj as RcFile, (url) => {
            setImageUrl(url);
          });
        }
      };



    return(
        <Modal
            {...props}
            width={450}
            title={
                <div className={'edit-title-container'}>
                    <div className={'edit-title'}>
                        <span> EDIT POKÉMON </span>
                    </div>
                </div>
            }
            >
            <div className={'modal-create-content'}>
                
                <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    onChange={handleChange}
                     >
                        <div>
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}

                        </div>
                </Upload>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    autoComplete="off"
                    >
                        <span> Pokémon Name* </span>
                        <Form.Item
                        style={{paddingTop: 5}}
                            name="name"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input style={{boxShadow: '0px 0 6px rgba(0,0,0,0.2)', background: 'inherit'}} placeholder={'Ex. Billisaurus'} />
                        </Form.Item>

                        <span> Pokémon Height* </span>
                        <Form.Item
                        style={{paddingTop: 5}}
                            name="height"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input style={{boxShadow: '0px 0 6px rgba(0,0,0,0.2)', background: 'inherit'}} placeholder={'Ex. 45'} />
                        </Form.Item>

                        <span> Pokémon Weight* </span>
                        <Form.Item
                        style={{paddingTop: 5}}
                            name="weight"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input style={{boxShadow: '0px 0 6px rgba(0,0,0,0.2)'}} placeholder={'Ex. 125'} />
                        </Form.Item>

                        <Form.Item style={{display: 'flex', justifyContent: 'center'}} >
                                <button className={'app-button'}> Save </button>
                        </Form.Item>
                    </Form>
                </div>

            </Modal>
    )

}