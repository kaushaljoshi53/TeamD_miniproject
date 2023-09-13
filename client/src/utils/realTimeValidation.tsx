



export class signUpRealTime {
    static validateEmail(email: string): string {
        if (!email.trim()) {
            return "Email is required";
        } else if (!email.endsWith("@jmangroup.com")) {
            return "Email invalid";
        } else if (!/^[A-Za-z]+$/.test(email.split('@')[0])){
            return "Email invalid"
        }
        return "";
    }

    static validateEmployeeID(employeeId: string): string {
        if (!employeeId.trim()) {
            return "Employee ID is required";
        } else if (!/^\d+$/.test(employeeId)) {
            return "Employee ID is a number followed by JMD"
        }
        return "";
    }


    static validateName(name: string): string {
        if (!name.trim()) {
            return "Name is required";
          } else if (!/^[A-Za-z]+$/.test(name)) {
            return "Enter valid name"
          }

        return "";
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
    static validatePassword(password: string): string {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*()_+]/.test(password);
        const hasNumber = /\d/.test(password);

        if (password.length < minLength) {
            return "Password must be at least 8 characters long";
        }

        if (!hasUpperCase) {
            return "Password must contain at least one uppercase letter";
        }

        if (!hasLowerCase) {
            return "Password must contain at least one lowercase letter";
        }

        if (!hasSpecialChar) {
            return "Password must contain at least one special character (e.g., !@#$%^&*()_+)";
        }

        if (!hasNumber) {
            return "Password must contain at least one digit (number)";
        }

        return "";
    }


    static validateRepassword(password: string, repassword: string): string {
        if (password !== repassword) {
            return "Passwords do not match";
        }
        return "";
    }
}


