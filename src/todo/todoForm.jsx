import React from 'react'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'

export default props => {
    const keyHandler = (e) =>{
        if(e.key === 'Enter'){
            e.shiftKey ? props.handleSearch() : props.handleAdd()
        }
    }
    return (
        <div role='form' className='todoForm'>
            <Grid cols='12 9 10' >
                <input id='description' className='form-control' onKeyUp={keyHandler} placeholder='Adicione um tarefa' value={props.description} onChange={props.handleChange} />
            </Grid>
            <Grid cols='12 3 2'>
                <IconButton style='primary' icon='plus' onClick={props.handleAdd} ></IconButton>
                <IconButton style='info' icon='search' onClick={props.handleSearch} ></IconButton>
            </Grid>
        </div>
    )
}