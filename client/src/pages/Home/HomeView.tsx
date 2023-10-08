import { useEffect, useState } from 'react';
import reactLogo from '../../assets/react.svg';
import viteLogo from '../../../public/vite.svg';
import { Button } from '@/components/ui/button';

const HomeView = () => {
  const [count, setCount] = useState(0);
  async function fetch_session() {
    const response = await fetch('http://localhost:3000', {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    console.log(data);

    return data;
  }

  useEffect(() => {
    fetch_session();
  }, []);

  return (
    <div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default HomeView;
