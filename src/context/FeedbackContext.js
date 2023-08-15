import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FeedbackData from "../data/FeedbackData";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //   Feedback that we are editing will go inside item propety and edit will be true
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  });

  useEffect(() => {
    fetchFeedback();
  }, []);

  //   Fetch Feedback
  const fetchFeedback = async () => {
    try {
      const response = await fetch("/feedback?_sort=id&_order=desc");
      const data = await response.json();
      setFeedback(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  //   Delete Feedback
  const deleteFeedback = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      await fetch(`/feedback/${id}`, { method: "DELETE" });
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  //   Update feedback item
  // Why we used map here is because we would set the entire array in it, not one item
  const updateFeedback = async (id, updatedItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    const data = await response.json();
    setFeedback(
      feedback.map((item) => {
        return item.id === id ? { ...item, ...data } : item;
      })
    );
  };

  //   Add Feedback - JSON server creates an ID automatically
  const addFeedback = async (newFeedback) => {
    const response = await fetch("/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await response.json();

    // newFeedback.id = uuidv4();
    setFeedback([data, ...feedback]);
  };

  //   Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
