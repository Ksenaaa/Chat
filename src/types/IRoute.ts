import React from "react";
import { LoginPage } from "../pages/LoginPage";
import { PageChat } from "../pages/PageChat";

export interface IRoute {
    path: string;
    element: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    CHAT = '/chat'
}

export const publicRoutes: IRoute[] = [
    {path: RouteNames.LOGIN, exact: true, element: LoginPage}
]

export const privateRoutes: IRoute[] = [
    {path: RouteNames.CHAT, exact: true, element: PageChat}
]