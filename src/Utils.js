export const EstateTaxInputFields = {
    REAL_ESTETE_OREGON: 'realEstateOregon',
    REAL_ESTATE_OTHER_STATES: 'realEstateOtherStates',
    TANGIBLE_PROPERTY_OREGON: 'tangiblePersonalPropertyOregon',
    TANGIBLE_PROPERTY_OTHER_STATES: 'tangiblePersonalPropertyOtherStates',
    INTANGIBLE_PROPERTY_OREGON: 'intangiblePersonalPropertyOregon',
    INTANGIBLE_PROPERTY_OTHER_STATES: 'intangiblePersonalPropertyOtherStates',
}

export const formatCurrency = (number) => {
    // Convert number to string and split it into an array of characters
    let numStr = number.toString().split('');
    
    // Initialize variables
    let result = '';
    let count = 0;

    // Iterate over the characters of the number in reverse order
    for (let i = numStr.length - 1; i >= 0; i--) {
        // Add a comma every 3 digits
        if (count % 3 === 0 && count !== 0) {
            result = ',' + result;
        }
        // Append current character to the result string
        result = numStr[i] + result;
        count++;
    }

    // Add dollar sign at the beginning
    result = '$' + result;
    
    return result;
}
