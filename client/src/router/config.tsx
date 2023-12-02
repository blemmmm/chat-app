import Navbar from '@/components/navbar/Navbar';
import { HomePage } from '@/pages/Home';
import { RouteObject } from 'react-router-dom';

export const config: RouteObject[] = [
  {
    path: '/',
    element: (
      <div>
        <Navbar />
        <HomePage />
      </div>
    ),
  },
];
