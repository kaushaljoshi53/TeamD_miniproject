


export default class projectValidation {

    public static isValidDateFormat(input:any) {
        // Define a regular expression pattern for yyyy/mm/dd or yyyy-mm-dd format
        const dateFormatPattern = /^(\d{4}\/\d{2}\/\d{2}|\d{4}-\d{2}-\d{2})$/;

        // Use the test() method to check if the input matches the pattern
        return dateFormatPattern.test(input);
    }

    public static isStartDateBeforeEndDate(startDate:any, endDate:any) {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
      
        // Use the getTime() method to compare the dates as timestamps
        return startDateObj.getTime() < endDateObj.getTime();
      }
      
}

