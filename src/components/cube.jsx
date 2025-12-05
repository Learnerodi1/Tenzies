import React,{Component, useState} from "react";

const Cube = (props)=>{
    const styles = {
        backgroundColor : `${ props.IsClassActive ? " rgba(62, 28, 172, 1)" : " rgba(234, 236, 245, 1)" }`,
        width : "50px",
        color : `${props.IsClassActive ? " rgba(249, 249, 238, 1)" : " rgba(11, 11, 11, 1)" }`,
        height :"50px",
        maxWidth : "50px",
        maxHeight :"50px",
        borderRadius :"10px",
        display : "flex",
        justifyContent : "center",
        alignItems : "center",
        cursor : "pointer",
        fontWeight :"Bold",
        fontSize : "2rem ",
        boxShadow : "0px 5px 5px rgba(0, 0, 0, 0.26)"
    }
    return(
        <div className="Cube" id={props.id} style={styles} onClick={()=> props.Activate(props.id )}>
            {props.number}
        </div>
    )
}

export {Cube}