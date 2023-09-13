



export class signUpBackend {
    static validateEmail(email: string): {result:boolean,message:string} {
        if (!email.trim()) {
            return {result:false,message:"Email is required"};
        } else if (!email.endsWith("@jmangroup.com")) {
            return {result:false,message:"Email invalid"};
        } else if (!/^[A-Za-z]+$/.test(email.split('@')[0])){
            return {result:false,message:"Email invalid"};
        }
        return {result:true,message:""};
    }

    static validateEmployeeID(employeeId: string):{result:boolean,message:string}{
        if (!employeeId.trim()) {
            return {result:false,message:"Employee ID is required"};
        } else if (!/^\d+$/.test(employeeId)) {
            return {result:false,message:"Employee ID is a number followed by JMD"};
        }
        return {result:true,message:""};
    }


    static validateName(name: string):{result:boolean,message:string}{
        if (!name.trim()) {
            return {result:false,message:"Name is required"};
          } else if (!/^[A-Za-z]+$/.test(name)) {
            return {result:false,message:"Enter valid name"};
          }

        return {result:true,message:""};
    }

    // src/utils/FormValidation.ts

    /**
     * Validate password to ensure it meets the following criteria:
     * 1. At least 8 characters long.
     * 2. Contains at least one uppercase letter.
     * 3. Contains at least one lowercase letter.
     * 4. Contains at least one special character (e.g., !@#$%^&*()_+).
     * 5. Contains at least one digit (number).
     *
     * @param {string} password - The password to validate.
     * @returns {string} - An error message if validation fails, empty string otherwise.
     */
    static validatePassword(password: string):{result:boolean,message:string}{
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+]/.test(password);
        const hasNumber = /\d/.test(password);

        if (password.length < minLength) {
            return {result:false,message:"Password must be at least 8 characters long"};
        }

        if (!hasUpperCase) {
            return {result:false,message:"Password must contain at least one uppercase letter"};
        }

        if (!hasLowerCase) {
            return {result:false,message:"Password must contain at least one lowercase letter"};
        }

        if (!hasSpecialChar) {
            return {result:false,message:"Password must contain at least one special character (e.g., !@#$%^&*()_+)"};
        }

        if (!hasNumber) {
            return {result:false,message:"Password must contain at least one digit (number)"};
        }

        return {result:true,message:""};
    }
}


