


export default class eventValidation {

    public static isValidDateFormat(dateString: string): boolean {
        // Regular expression pattern for validating "dd/mm/yyyy" date format
        const dateFormatPattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
      
        return dateFormatPattern.test(dateString);
      }

    public static isValidTime(time: string): boolean {
        
        const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
      
        return timePattern.test(time);
      }


      public static isStartTimeBeforeEndTime(startTime: string, endTime: string): boolean {
        const [startHours, startMinutes] = startTime.split(':').map(Number);
        const [endHours, endMinutes] = endTime.split(':').map(Number);
        // Compare start and end times
        if (startHours < endHours || (startHours === endHours && startMinutes < endMinutes)) {
          return true; // Start time is before end time
        }
        return false; // Start time is not before end time
      }
}