import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import FeedbackList from "./components/FeedbackList";
import FeedbackStats from "./components/FeedbackStats";
import FeedbackForm from "./components/FeedbackForm";
import AboutPage from "./pages/AboutPage";
import AboutIconLink from "./components/AboutIconLink";
import Post from "./components/Post";
import { FeedbackProvider } from "./context/FeedbackContext";
import NavigateAndNested from "./components/NavigateAndNested";

function App() {
  // App level state
  // const [feedback, setFeedback] = useState(FeedbackData);

  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route
              exact
              path="/"
              element={
                <>
                  <FeedbackForm
                  // handleAdd={addFeedback}
                  />
                  <FeedbackStats
                  // feedback={feedback}
                  />
                  <FeedbackList
                  // feedback={feedback}
                  // handleDelete={(id) => deleteFeedback(id)}
                  />
                </>
              }
            ></Route>
            <Route path="/about" element={<AboutPage />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/navigate" element={<NavigateAndNested />} />
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
