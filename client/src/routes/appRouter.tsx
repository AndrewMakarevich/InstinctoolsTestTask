import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HOME_PAGE_ROUTE } from './consts';
import { publicRoutes } from './routes';
const AppRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<Navigate to={HOME_PAGE_ROUTE} />} />
            {
                publicRoutes.map(({ path, component }) => {
                    return <Route key={path} path={path} element={component()} />
                })
            }
        </Routes>
    )
};
export default AppRouter;