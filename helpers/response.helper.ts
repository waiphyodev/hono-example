const responseHelper = {
    ok: (data: any, message?: string) => ({
        code: 200,
        status: "OK",
        message: message ? message : "Success",
        data: data && data,
    }),
    created: (message?: string) => ({
        code: 201,
        status: "CREATED",
        message: message ? message : "Resource is created.",
    }),
    badRequest: (message?: string) => ({
        code: 400,
        status: "BAD REQUEST",
        message: message ? message : "Something went wrongs.",
    }),
    notFound: (message?: string) => ({
        code: 404,
        status: "NOT FOUND",
        message: message ? message : "Resource is not found.",
    }),
    unknown: (message?: string) => ({
        code: 500,
        status: "UNKNOWN",
        message: message ? message : "Internal Server Error",
    }),
};

export default responseHelper;
