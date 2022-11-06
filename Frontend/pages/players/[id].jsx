import {useEffect, useState} from "react";
import { getDatabase, ref, onValue, query, orderByChild } from "firebase/database";

import { useDispatch, useSelector } from "react-redux";
import { processing, success } from "../../store/statusSlice";
import axios from 'axios';

import Link from 'next/link'
import styles from '../../styles/Profile.module.css'

export default function Profile() {
    const [player, setPlayer] = useState('');
    const [enableEdit, setEnableEdit] = useState(false);
    const [_userId, setUserId] = useState('');

    const status = useSelector(state => {
        return state.status.status;
    });

    useEffect(() => {
        const user_id = localStorage.getItem('user_id');
        const token = localStorage.getItem('token')
        async function fetchData() {
            const response = await axios.get('http://localhost:4000/api/v1/user/' + user_id, {
            headers: {Authorization: `Bearer ${token}`}})
            const data = response.data;
            setPlayer({
                username: data.username,
                email: data.email,
                bio: data.bio,
                score: '',
                level: '',
                url: data.url ?? "https://firebasestorage.googleapis.com/v0/b/fsw22-kelompok1.appspot.com/o/pexels-ron-lach-7848986.jpg?alt=media&token=8a222888-d8f9-4cf6-bc1f-9a744ab0bb5a",
            })
        return response
        }
        fetchData();
    }, [])
     
    return(
        <div className={styles.profilePage + ' bg-dark'}>
            <div className="container">
            <div className="row no-gutters">
                <div className="col-md-4 col-lg-4">
                    <img src={player.url} className={ styles.img + " img-fluid"} />
                </div>
                <div className="col-md-8 col-lg-8">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-info text-white">
                            <h2 className="display-4">{player.username}</h2></div>
                        <div className={ styles.bgBlack + ' p-3 text-white'}>
                            <h6>{player.bio}</h6>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}