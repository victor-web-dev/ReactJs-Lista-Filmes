import React, {useEffect, useState} from 'react';
import './filme.css';

import {useParams} from 'react-router-dom';
import api from '../../services/api';

export default function Filme(){

    const {id} = useParams();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect( () => {

        async function loadFilme(){
            try{
                const response = await api.get(`r-api/?api=filmes/${id}`);
                setFilme(response.data);
                setLoading(false);
            }catch(error){
                console.log('Erro ao solicitar o filme' + error);
            }
            
        }

        loadFilme();

    }, [id]);

    
    if(loading){
        return(
            <div className="filme-info">
                <h1>Carregando...</h1>
            </div>
        );
    }


    return(
        <div className="filme-info">
            <h1>Filme info</h1>
        </div>
    );

}