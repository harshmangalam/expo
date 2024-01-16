// import { Counter } from '../components/Counter';

const App = ({ name }: { name: string }) => {
  return (
    <div style={{ border: '3px red dashed', margin: '1em', padding: '1em' }}>
      <title>RSC example</title>
      <h1>Hello {name}!!</h1>
      <h3>This is a server component.</h3>
      {/* <Counter /> */}
      <div>{new Date().toISOString()}</div>
    </div>
  );
};

export default App;
