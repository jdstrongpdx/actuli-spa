export enum ApiRoutes {
    Default = "/",
    GetUser = "/user",
    UpdateUser = "/user",
    DeleteUser = "/user",
    GetAllUsers = "/users",
    GetUserById = "/users/:id",
    UpdateUserById = "/users/:id",
    DeleteUserById = "/users/:id",
    UpdateUserContact = "/users/profile/contact",
    GetTypes = "/types"
}

// Example :id usage const userUrl = ApiRoutes.GetUserById.replace(":id", userId);