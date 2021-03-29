import React, {useEffect, useState} from 'react';
import './filme.css';

import {useParams, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function Filme(){

    const {id} = useParams(); //parametros de rota
    const history = useHistory();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true); //Parametro para carregamento de pagina.

    useEffect( () => {

        async function loadFilme(){
            try{
                const response = await api.get(`r-api/?api=filmes/${id}`);


                if(response.data.length === 0){
                    //Caso acesse um id que nao existe, o usuario eh redirecionado.
                    history.replace('/');

                    return; //return para o codigo seguinte nao ser executado.
                }


                setFilme(response.data);
                setLoading(false);
            }catch(error){
                console.log('Erro ao solicitar o filme' + error);
            }
            
        }

        loadFilme();

    }, [history,id]);


    function salvaFilme(){

        const minhaLista = localStorage.getItem('filmes');

        let filmesSalvos = JSON.parse(minhaLista) || []; 
        //caso nao tenha nada na variavel minhaLista, ele preenche com array vazio

        //Comparacao para ver se ja existe o filme na lista
        //O filme salvo com o mesmo id precisa ser ignorado
        const hasFilme = filmesSalvos.some( (filmeSalvo) =>  filmeSalvo.id === filme.id );

        if(hasFilme){
            alert('Voce ja possui ese filme salvo');
            return; //return para parar a execucao
        }

        filmesSalvos.push(filme); //A variavel filme usada, vem do state.

        //Salvando no Local Storage
        //filmes eh a key para acessar os dados no local storage
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));

        alert('Filme Salvo');

    }



    
    if(loading){ //carregamento da pagina caso true
        return(
            <div className="filme-info">
                <h1>Carregando...</h1>
            </div>
        );
    }

    //caso false, os dados sao carregados normalmente
    return(
        <div className="filme-info">
            <h1> {filme.nome} </h1>
            <img src={filme.foto} alt={filme.nome}/>

            <h3>Sinopse</h3>
            <p>{filme.sinopse}</p>

            <div>
                <button onClick={() => {salvaFilme()}}>Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    );

}