import { getAnalytics, isSupported } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useNavigate, useRoutes } from 'react-router-dom';
import { FullScreenLoader } from './common/components/full-screen-loader';
import {
  ENV_CONFIG_FIREBASE_API_KEY,
  ENV_CONFIG_FIREBASE_APP_ID,
  ENV_CONFIG_FIREBASE_AUTH_DOMAIN,
  ENV_CONFIG_FIREBASE_MEASUREMENT_ID,
  ENV_CONFIG_FIREBASE_MESSAGING_SENDER_ID,
  ENV_CONFIG_FIREBASE_PROJECT_ID,
  ENV_CONFIG_FIREBASE_STORAGE_BUCKET,
} from './common/constants/env';

const LazyAuthLayout = React.lazy(() => import('./layout/auth'));

const LazyPrivateLayout = React.lazy(() => import('./layout/private'));

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useMemo(() => {
    const firebaseConfig = {
      apiKey: ENV_CONFIG_FIREBASE_API_KEY,
      authDomain: ENV_CONFIG_FIREBASE_AUTH_DOMAIN,
      projectId: ENV_CONFIG_FIREBASE_PROJECT_ID,
      storageBucket: ENV_CONFIG_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: ENV_CONFIG_FIREBASE_MESSAGING_SENDER_ID,
      appId: ENV_CONFIG_FIREBASE_APP_ID,
      measurementId: ENV_CONFIG_FIREBASE_MEASUREMENT_ID,
    };
    initializeApp(firebaseConfig);
    isSupported().then((supported) => (supported ? getAnalytics() : null));
  }, []);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      const currentRoute = window.location.pathname;
      if (user) {
        if (currentRoute.startsWith('/app')) {
          navigate(currentRoute);
        } else {
          navigate('/app/dashboard');
        }
      } else {
        if (currentRoute.startsWith('/auth')) {
          navigate(currentRoute);
        } else {
          navigate('/auth/login');
        }
      }
      setIsLoading(false);
    });
  }, [navigate]);

  const authRoutes = useMemo(
    () => ({
      path: '/auth/*',
      element: <LazyAuthLayout />,
    }),
    [],
  );

  const privateRoutes = useMemo(
    () => ({
      path: '/app/*',
      element: <LazyPrivateLayout />,
    }),
    [],
  );

  const routing = useRoutes([authRoutes, privateRoutes]);

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return <Suspense fallback={<FullScreenLoader />}>{routing}</Suspense>;
}

export default App;
