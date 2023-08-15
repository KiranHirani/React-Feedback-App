import Card from './shared/Card';
import { useState } from 'react';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';
import { useContext, useEffect } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackForm(){
    const [text, setText] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [rating, setRating] = useState(10);
    const {addFeedback, feedbackEdit, updateFeedback} = useContext(FeedbackContext);

    const handleTextChange = (event) => {
        if(text === ''){
            setStates(true, null);
        } else if(text !== '' && text.trim().length <= 10 ){
            setStates(true, 'Text must be atleast 10 characters')
        } else {
            setStates(false, null)
        }
        setText(event.target.value);
    }

    const setStates = (btnValue, msgValue) => {
        setBtnDisabled(btnValue);
        setMessage(msgValue);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let newFeedback;
        if(text.trim().length > 10){
            newFeedback = { text, rating }
        }
        feedbackEdit.edit ? updateFeedback(feedbackEdit.item.id, newFeedback) : addFeedback(newFeedback);
        setText('');
    }

    // It takes an array of dependencies, which means if you change any element in here, this fn will run 
    // Any time user would click on any edit icon of feedback, feedbcakEdit would get updated
    // And then it would run this fn 
    useEffect(() => {
        if(feedbackEdit.edit){
            setBtnDisabled(false);
            setText(feedbackEdit.item.text);
            setRating(feedbackEdit.item.rating)
        }
    }, [feedbackEdit])

    return (
      <Card>
        <form onSubmit={handleSubmit}>
            <h2>How would you rate your service with us?</h2>
            {/* @todo - Rating select component */}
            <RatingSelect select={(rating) => setRating(rating)}/>
            <div className="input-group">
                <input onChange={handleTextChange} type="text" placeholder="Write a review" value={text}/>
                <Button type="submit" isDisabled={btnDisabled}>Send</Button>
            </div>
            {message && <div className='message'>{message}</div>}
        </form>
      </Card>            
    )
}
export default FeedbackForm;