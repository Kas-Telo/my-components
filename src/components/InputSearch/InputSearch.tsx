import React from 'react';
import style from './InputSearch.module.css'
import searchIcon from './Union.png'

export const InputSearch = () => {
    return (
        <div className={style.container}>
            <div className={style.imgContainer}>
                <img src={searchIcon} alt="search img"/>
            </div>
            <input type="text" placeholder={'Provide your text'}/>
        </div>
    );
};