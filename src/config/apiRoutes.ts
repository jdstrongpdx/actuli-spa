export enum ApiRoutes {
    Default = "/",
    GetUser = "/user",
    UpdateUser = "/user",
    DeleteUser = "/user",
    UpdateUserContact = "/user/profile/contact",
    GetAllUsers = "/users",
    GetUserById = "/users/:id",
    UpdateUserById = "/users/:id",
    DeleteUserById = "/users/:id",

    GetTypes = "/types"
}

// Example :id usage const userUrl = ApiRoutes.GetUserById.replace(":id", userId);