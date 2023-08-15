import {motion, AnimatePresence} from 'framer-motion';
import FeedbackItem from "./FeedbackItem";
import PropTypes from 'prop-types';
import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';

function FeedbackList(){
    const {feedback} = useContext(FeedbackContext);
    const {handleDelete} = useContext(FeedbackContext);
    if(!feedback || feedback.length == 0){
        return (<p> No feedback yet!</p>)
    }
    return (
        <div className="feedback-list">  
            <AnimatePresence>     
            {feedback.map((item) => 
                <motion.div 
                key={item.id}
                initial={{opacity: 0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                >
                <FeedbackItem key={item.id} item={item} 
                // handleDelete={handleDelete}
                />
                </motion.div>
            )}     
            </AnimatePresence>          
        </div>
    )
}

// Setting the type of props, if we want to have the array of a specific type
// FeedbackList.propTypes = {
//     feedback: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             rating: PropTypes.number.isRequired,
//             text: PropTypes.string.isRequired
//         })
//     )
// }

export default FeedbackList;




// Without Animation
// return (
//     <div className="feedback-list">          
//         {feedback.map((item) => {
//             return <FeedbackItem key={item.id} item={item} handleDelete={handleDelete}/>
//         })}            
//     </div>
// )