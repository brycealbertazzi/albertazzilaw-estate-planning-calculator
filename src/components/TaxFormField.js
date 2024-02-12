import React from 'react'
import { InputAdornment, TextField, IconButton } from '@mui/material';
import { InfoOutlined } from '@mui/icons-material';
import './EstatePlanningCalculator.css'

export const TaxFormField = ({fieldName, label, setOpenPopover, setAnchorEl, updateUserInput}) => {
    const styles = {
        formField: {
          width: '400px',
          marginLeft: '10px',
        }
    }

    return (
        <div className='esp-form-field'>
            <IconButton onClick={(e) => {setAnchorEl(e.currentTarget); setOpenPopover(true)}}>
                <InfoOutlined />
            </IconButton>
            <TextField
                id="oregon-real-estate"
                label={label}
                variant="outlined"
                placeholder='0'
                onChange={(e) => {updateUserInput(fieldName, Number(e.target.value))}}
                type='number'
                sx={styles.formField}
                inputProps={{ step: 1, min: 0 }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />
        </div>
    )
}
