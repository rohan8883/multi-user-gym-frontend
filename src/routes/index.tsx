import { Routes, Route, Navigate } from 'react-router-dom';
import { StudentLayout, AuthLayout } from '@/layouts';
import { AuthGuard, GuestGuard } from '@/guard';
import NotFound from '@/pages/errors/NotFound';
import routes from './allRoutes';

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/gym-app"
        element={<Navigate to="/gym-app/landing-page" />}
        // element={<Navigate to="/gym-app/auth/login" />}
        index={true}
      />

      {/*************************************Auth Routes********************************************/}
      <Route
        path="/gym-app/auth"
        element={
          <GuestGuard>
            <AuthLayout />
          </GuestGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'auth' &&
            pages?.map(({ path, element, id }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/*************************************GYM Routes********************************************/}
      <Route
        path="/gym-app"
        element={
          <AuthGuard>
            <StudentLayout />
          </AuthGuard>
        }
      >
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'gym-app' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/*************************************Guest Routes********************************************/}
      <Route path="/gym-app">
        {routes?.map(
          ({ layout, pages }) =>
            layout === 'guest' &&
            pages?.map(({ id, path, element }) => (
              <Route key={id} path={path} element={element} />
            ))
        )}
      </Route>

      {/***************************************404 Routes****************************************************/}
      <Route path="*" element={<NotFound />} />
      <Route path="" element={<Navigate to="/gym-app" replace />} />
    </Routes>
  );
}
