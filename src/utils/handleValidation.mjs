
export const handleValidation = {
    username: {
        isLength: {
            options: {
                min: 3,
                max: 30,
            },
            errorMessage: "user must be between 3 and 30 character",
        },
        notEmpty: {
            errorMessage: "username is required"
        },
        isString: {
            errorMessage: "username must be string"
        }
    }
};
