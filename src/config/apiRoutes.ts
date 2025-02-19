export enum ApiRoutes {
    Default = "/",
    GetUser = "/user",
    UpdateUser = "/user",
    DeleteUser = "/user",
    UpdateUserContact = "/user/profile/contact",
    UpdateUserEducationList = "/user/profile/education",
    UpdateUserWorkList = "/user/profile/work",
    GetAllUsers = "/users",
    GetUserById = "/users/:id",
    UpdateUserById = "/users/:id",
    DeleteUserById = "/users/:id",

    GetTypes = "/types"
}

// Example :id usage const userUrl = ApiRoutes.GetUserById.replace(":id", userId);