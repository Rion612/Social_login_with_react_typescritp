export function success(message: any, data: any= {}) {
    const response = {
        status: true,
        message: message,
        result: data,
    };
    return response;
}

export function failure(message: any, errors:any = {}) {
    const response = {
        status: false,
        message: message,
        errors: errors,
    };
    return response;
}