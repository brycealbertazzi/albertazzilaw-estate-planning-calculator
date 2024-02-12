import React, { useEffect, useState } from 'react'
import './EstatePlanningCalculator.css'
import { Popover, Typography } from '@mui/material'
import { EstateTaxInputFields, formatCurrency } from '../Utils'
import { TaxFormField } from './TaxFormField'

const EstatePlanningCalculator = () => {  
  const [userInput, setUserInput] = useState({})
  const [grossTaxableEstate, setGrossTaxableEstate] = useState(0)
  const [oregonTaxBase, setOregonTaxBase] = useState(0)
  const [nonResidentTaxBase, setNonResidentTaxBase] = useState(0)
  const [oregonCalculatedTax, setOregonCalculatedTax] = useState(0)
  const [nonResidentCalculatedTax, setNonResidentCalculatedTax] = useState(0)

  const [anchorEl, setAnchorEl] = useState(null)
  const [openPopover, setOpenPopover] = useState(false)

  const applyTaxTableToGTE = () => {
    const taxTable = [
      {gte: 0, lte: 1000000, rate: 0},
      {gte: 1000000, lte: 1500000, rate: 0.1},
      {gte: 1500000, lte: 2500000, rate: 0.1025},
      {gte: 2500000, lte: 3500000, rate: 0.105},
      {gte: 3500000, lte: 4500000, rate: 0.11},
      {gte: 4500000, lte: 5500000, rate: 0.115},
      {gte: 5500000, lte: 6500000, rate: 0.12},
      {gte: 6500000, lte: 7500000, rate: 0.13},
      {gte: 7500000, lte: 8500000, rate: 0.14},
      {gte: 8500000, lte: 9500000, rate: 0.15},
      {gte: 9500000, lte: Infinity, rate: 0.16}
    ]
    let tax = 0
    let gte = grossTaxableEstate
    for (let i = 0; i < taxTable.length; i++) {
      if (gte > taxTable[i].lte) {
        tax += (taxTable[i].lte - taxTable[i].gte) * taxTable[i].rate
      } else {
        tax += (gte - taxTable[i].gte) * taxTable[i].rate
        break
      }
    }
    return tax
  }

  const updateUserInput = (field, value) => {
    setUserInput((prev) => {
      return ({
        ...prev,
        [field]: value
      })
    })
  }

  const onSubmit = () => {
    const taxValueFromTable = applyTaxTableToGTE()
    setOregonCalculatedTax(Math.round(taxValueFromTable * (oregonTaxBase / grossTaxableEstate)))
    setNonResidentCalculatedTax(Math.round(taxValueFromTable * (nonResidentTaxBase / grossTaxableEstate)))
  }

  useEffect(() => {
    // Calculate Tax Base values as user inputs change
    setOregonTaxBase(() => {
      return (
        userInput[EstateTaxInputFields.REAL_ESTETE_OREGON]
        + userInput[EstateTaxInputFields.TANGIBLE_PROPERTY_OREGON]
        + userInput[EstateTaxInputFields.TANGIBLE_PROPERTY_OTHER_STATES]
        + userInput[EstateTaxInputFields.INTANGIBLE_PROPERTY_OREGON]
        + userInput[EstateTaxInputFields.INTANGIBLE_PROPERTY_OTHER_STATES]
      )
    })
    setNonResidentTaxBase(() => {
      return (
        userInput[EstateTaxInputFields.REAL_ESTETE_OREGON]
        + userInput[EstateTaxInputFields.TANGIBLE_PROPERTY_OREGON]
      )
    })
    setGrossTaxableEstate(() => {
      return (
        userInput[EstateTaxInputFields.REAL_ESTETE_OREGON] 
        + userInput[EstateTaxInputFields.REAL_ESTATE_OTHER_STATES] 
        + userInput[EstateTaxInputFields.TANGIBLE_PROPERTY_OREGON] 
        + userInput[EstateTaxInputFields.TANGIBLE_PROPERTY_OTHER_STATES] 
        + userInput[EstateTaxInputFields.INTANGIBLE_PROPERTY_OREGON] 
        + userInput[EstateTaxInputFields.INTANGIBLE_PROPERTY_OTHER_STATES]
      )
    })
  }, [userInput])

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (typeof(e.target.className) === 'string' && e.target.className.includes('MuiBackdrop-root')) {
        setOpenPopover(false)
        setAnchorEl(null)
      }
    })

    setUserInput(() => {
      return ({
        [EstateTaxInputFields.REAL_ESTETE_OREGON]: 0,
        [EstateTaxInputFields.REAL_ESTATE_OTHER_STATES]: 0,
        [EstateTaxInputFields.TANGIBLE_PROPERTY_OREGON]: 0,
        [EstateTaxInputFields.TANGIBLE_PROPERTY_OTHER_STATES]: 0,
        [EstateTaxInputFields.INTANGIBLE_PROPERTY_OREGON]: 0,
        [EstateTaxInputFields.INTANGIBLE_PROPERTY_OTHER_STATES]: 0
      })
    })
  }, [])

  return (
    <div className='esp-container'>
      <div className='esp-header'>
        <h1>Albertazzi Law Estate Planning Calculator</h1>
      </div>
      <div className='esp-content'>
        <div className='esp-form'>
          <h2>Real Estate</h2>
          <div className='esp-form-field-group'>
            <TaxFormField fieldName={EstateTaxInputFields.REAL_ESTETE_OREGON} label='Real Estate in Oregon' setOpenPopover={setOpenPopover} setAnchorEl={setAnchorEl} updateUserInput={updateUserInput} />
            <TaxFormField fieldName={EstateTaxInputFields.REAL_ESTATE_OTHER_STATES} label='Real Estate in Other States' setOpenPopover={setOpenPopover} setAnchorEl={setAnchorEl} updateUserInput={updateUserInput} />
          </div>
          <h2>Tangible Personal Property</h2>
          <div className='esp-form-field-group'>
            <TaxFormField fieldName={EstateTaxInputFields.TANGIBLE_PROPERTY_OREGON} label='Tangible Property in Oregon' setOpenPopover={setOpenPopover} setAnchorEl={setAnchorEl} updateUserInput={updateUserInput} />
            <TaxFormField fieldName={EstateTaxInputFields.TANGIBLE_PROPERTY_OTHER_STATES} label='Tangible Property in Other States' setOpenPopover={setOpenPopover} setAnchorEl={setAnchorEl} updateUserInput={updateUserInput} />
          </div>
          <h2>Intangible Personal Property</h2>
          <div className='esp-form-field-group'>
            <TaxFormField fieldName={EstateTaxInputFields.INTANGIBLE_PROPERTY_OREGON} label='Intangible Property in Oregon' setOpenPopover={setOpenPopover} setAnchorEl={setAnchorEl} updateUserInput={updateUserInput} />
            <TaxFormField fieldName={EstateTaxInputFields.INTANGIBLE_PROPERTY_OTHER_STATES} label='Intangible Property in Other States' setOpenPopover={setOpenPopover} setAnchorEl={setAnchorEl} updateUserInput={updateUserInput} />
          </div>
        </div>
        <button className='esp-submit-btn' onClick={() => onSubmit()}>Calculate Estate Tax</button>
        <h2>Calculated Tax Results</h2>
        <div className='esp-results'>
          <div className='esp-result'>
            <h3>Oregon Estate Tax:&nbsp;&nbsp;&nbsp;&nbsp;{oregonCalculatedTax ? formatCurrency(oregonCalculatedTax) : '$0'}</h3>
          </div>
          <div className='esp-result'>
            <h3>Non Resident Tax:&nbsp;&nbsp;&nbsp;&nbsp;{nonResidentCalculatedTax ? formatCurrency(nonResidentCalculatedTax) : '$0'}</h3>
          </div>
        </div>
      </div>
      <Popover
        id={null}
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>Show field description here...</Typography>
      </Popover>
    </div>
  )
}

export default EstatePlanningCalculator
