export const EstateTaxInputFields = {
    REAL_ESTETE_OREGON: 'realEstateOregon',
    REAL_ESTATE_OTHER_STATES: 'realEstateOtherStates',
    TANGIBLE_PROPERTY_OREGON: 'tangiblePersonalPropertyOregon',
    TANGIBLE_PROPERTY_OTHER_STATES: 'tangiblePersonalPropertyOtherStates',
    INTANGIBLE_PROPERTY_OREGON: 'intangiblePersonalPropertyOregon',
    INTANGIBLE_PROPERTY_OTHER_STATES: 'intangiblePersonalPropertyOtherStates',
}

export const PopOverDescriptions = {
    A: "Enter the value of real estate you own below (land and buildings – such as your residence or rental real estate). Do not deduct for loans you may have against the property. If the real estate is owned in an LLC, corporation or other business entity, do not list it here. List it under the Intangible Personal Property section below.",
    B: "Tangible personal property means your physical possessions such as cars, boats, coin collections, firearms, artwork and the like. Anything you can physically hold is tangible personal property. The location of the property means where it is (or you think it may be) when you die.",
    C: "Intangible personal property means any other thing of value you own which is not real property or tangible property. Examples include cash, shares in a corporation, bank accounts, IRA accounts, 401k accounts, stock accounts, money which is owed to you by others. Important: remember to include the death benefit of any life insurance you hold in this section, even though those death benefits will go to others besides yourself.",
    ONE: "Enter the total value of real estate within the state of Oregon.",
    TWO: "Enter the total value of real estate outside of Oregon, including real estate you own in another country.",
    THREE: "Enter the estimated total value of property located on the date of your death in Oregon.",
    FOUR: "Enter the estimated total value of property located on the date of your death outside of Oregon (including in another country).",
    FIVE: "Enter the total value of intangible property held in Oregon, such as interests in an Oregon partnership, corporation or LLC.",
    SIX: "Enter the total value of intangible property held outside of Oregon (including in another country).",
}

export const FooterText = "The information provided herein is provided as a courtesy by Albertazzi Law Firm for illustrative purposes only, and should not be construed as tax or legal advice. Legal and tax questions should be directed to a qualified professional. You may also contact our office at 541-317-0231 or info@albertazzilaw.com."

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
