import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import HomeScreen from './screens/HomeScreen';
import GamesMenuScreen from './screens/GamesMenuScreen';
import PlayScreen from './screens/PlayScreen';
import GameScreen from './screens/GameScreen';
import ResultScreen from './screens/ResultScreen';
import QuickGameScreen from './screens/QuickGameScreen';
import QuickGameResultScreen from './screens/QuickGameResultScreen';
import CompleteExpressionScreen from './screens/CompleteExpressionScreen';
import LeaderboardScreen from './screens/LeaderboardScreen';
import TutorialScreen from './screens/TutorialScreen';
import TutorialLessonScreen from './screens/TutorialLessonScreen';
import ScenariosScreen from './screens/ScenariosScreen';
import ScenarioDetailScreen from './screens/ScenarioDetailScreen';
import AboutScreen from './screens/AboutScreen';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomeScreen /> },
      { path: '/games-menu', element: <GamesMenuScreen /> },
      { path: '/play', element: <PlayScreen /> },
      { path: '/game', element: <GameScreen /> },
      { path: '/result', element: <ResultScreen /> },
      { path: '/quick-game', element: <QuickGameScreen /> },
      { path: '/quick-game-result', element: <QuickGameResultScreen /> },
      { path: '/complete-expression', element: <CompleteExpressionScreen /> },
      { path: '/leaderboard', element: <LeaderboardScreen /> },
      { path: '/tutorial', element: <TutorialScreen /> },
      { path: '/tutorial-lesson', element: <TutorialLessonScreen /> },
      { path: '/scenarios', element: <ScenariosScreen /> },
      { path: '/scenario-detail', element: <ScenarioDetailScreen /> },
      { path: '/about', element: <AboutScreen /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
