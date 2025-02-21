import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SearchScreen from "./components/search/SearchScreen";
import SearchResults from "./components/search/SearchResults";
import GoalTemplate from "./components/goal/GoalTemplate";
import GoalCreate from "./components/goal/GoalCreate";
import GoalConfirmation from "./components/goal/GoalConfirmation";
import LoadingState from "./components/track/LoadingState";
import PersonalizedTrack from "./components/track/PersonalizedTrack";
import MainLayout from "./components/layout/MainLayout";
import Card from "./components/layout/Card";

function App() {
  return (
    <Router>
      <MainLayout>
        <Card>
          <Routes>
            <Route path="/" element={<Navigate to="/search" replace />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/search/results" element={<SearchResults />} />
            <Route path="/goal">
              <Route path="template" element={<GoalTemplate />} />
              <Route path="create" element={<GoalCreate />} />
              <Route path="confirm" element={<GoalConfirmation />} />
            </Route>
            <Route path="/track">
              <Route path="loading" element={<LoadingState />} />
              <Route path=":trackId" element={<PersonalizedTrack />} />
            </Route>
          </Routes>
        </Card>
      </MainLayout>
    </Router>
  );
}

export default App;
