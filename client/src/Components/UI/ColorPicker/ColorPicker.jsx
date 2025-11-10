import React, { useState } from "react";
import classes from './ColorPicker.module.css'
import api from '../../../api/axios'


const ColorPicker = (props) => {
  function click(e) {
    console.log('clicked')
        api.put(`/category/color/${props.categId}`, {
            color: e.target.style.background
        })
        props.refresh()
    }
    return (
        <div className={classes.ColorPicker}>
            <div onClick={click} className={classes.color} style={{ background: 'blue' }}></div>
            <div onClick={click} className={classes.color} style={{ background: 'purple' }}></div>
            <div onClick={click} className={classes.color} style={{ background: 'green' }}></div>
            <div onClick={click} className={classes.color} style={{ background: 'teal' }}></div>
            <div onClick={click} className={classes.color} style={{ background: 'red' }}></div>
        </div>
    );
};

export default ColorPicker;