import { faAngleDown, faAngleLeft, faEdit, faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import './DetailsPage.scss'
import { Recoil, useRecoilState, useRecoilValue } from '../../Recoil';
import { fetchApi } from '../../utils';
import { ThemeSwitch } from '../ThemeSwitch';
import { Edit } from '../Modal/Edit';


export const DetailsPage: React.FC = () => {
    const [pokemon, setPokemon] = useRecoilState(Recoil.Pokemon.Atom)
    const [pokemonDetails, setPokemonDetails] = useState<any>();
    const [editShow, setEditShow] = useState(false);
    const darkmode = useRecoilValue(Recoil.DarkMode.Atom)



    useEffect(() => {
        /* CBA Pokemon interface with all props */
        fetchApi<{[key: string]: any}>(`https://pokeapi.co/api/v2/pokemon/${pokemon?.name}`, 'GET').then((details) => {
            setPokemonDetails(details)
        })
    }, [])

    const DetailsCollapsible: React.FC<{title: string, values: string[]}> = ({title, values}) => {
        const [open, setOpen] = useState(false)
        return (
            <>
            <button style={{background: darkmode ? '#102a43' : 'inherit'}} onClick={() => setOpen(!open)}>
                <div className={'title-container'} style={{color: open ? '#1677FF' : undefined}}>
                    {title}
                </div>
                <div style={{textAlign: 'right', flex: 1, padding: '10px 20px', fontSize: 14}}>
                    <FontAwesomeIcon color={'#1677ff'} icon={faAngleDown} />
                </div>
            </button>
            {open && 
            <div style={{background: darkmode ? '#102a43' : 'inherit'}} className={'details-collapsible-content'}>
                <div>
                    {values.map((item) => <>&bull; {item} <br/></>)}
                </div>
            </div>}
            </>
            )
        }
    

    return <>
    <Edit show={editShow} onClose={() => setEditShow(false)} />
    <div className={'details-container'}>
            <div className={'details-container-left'}> 
                <div>
                    <button onClick={() => setPokemon(undefined)} className={'app-button'} style={{ border: darkmode ? '1px solid #fff' : undefined, color: darkmode ? 'white' : undefined}}> 
                        <FontAwesomeIcon style={{marginRight: 10, fontSize: 18}} icon={faAngleLeft} />                   
                        <p>Back</p>
                    </button>
                </div>
            </div>
            <div className={'details-container-center'}>
                <div className={'details-img'}> 
                    <img src={pokemon?.imgUrl}/>
                </div>
                <div className={"details-name"}>
                    <p>{pokemon?.name}</p>
                </div>
                <div className={"details-stats"}>
                        <p>Height: {pokemon?.height}</p>
                        <p>Weight: {pokemon?.weight}</p>
                        <p>Base experience: {pokemonDetails?.base_experience}</p>
                        <p>Default: true </p>
                        <p>Order: {pokemonDetails?.order}</p>
                        <p>Species: {pokemonDetails?.species.name}</p>

                </div>
                <div className={'details-collapsible'}>
                        <DetailsCollapsible title={'Abilities'} values={pokemonDetails?.abilities.map((ability: any) => ability.ability.name) as string[]}/>
                        <DetailsCollapsible title={'Forms'} values={pokemonDetails?.forms.map((form: any) => form.name) as string[]}/>
                        <DetailsCollapsible title={'Types'} values={pokemonDetails?.types.map((type: any) => `Name: ${type.type.name} Slot: ${type.slot}`) as string[]}/>
                        <DetailsCollapsible title={'Game indices'} values={pokemonDetails?.game_indices.map((gi: any) => `Game Index: ${gi.game_index} Version: ${gi.version.name}`) as string[]}/>
                        <DetailsCollapsible title={'Stats'} values={pokemonDetails?.stats.map((stat: any) => `Name: ${stat.stat.name} Effort: ${stat.effort} Base Stat: ${stat.base_stat}`) as string[]}/>
                        <DetailsCollapsible title={'Moves'} values={['Alot of Moves placeholder']}/>



                </div>
            </div>
            <div className={'details-container-right'}> 
                <ThemeSwitch />
                <div className={'details-action-container'}>
                    <button onClick={() => setEditShow(true) } className={'action-button'}> <FontAwesomeIcon icon={faEdit} /> Edit</button>
                    <button className={'action-button'}> <FontAwesomeIcon icon={faEllipsisVertical} /> More</button>
                </div>
            </div>
    </div>
    </>
}