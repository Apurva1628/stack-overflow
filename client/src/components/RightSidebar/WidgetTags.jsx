import React from 'react'


const WidgetTags = () => {


    const tags = ['c', 'css', 'express', 'firebase', 'html', 'java', 'javascript', 'mern', 'mongodb', 'mysql', 'next.js', 'node.js', 'php', 'python', 'reactjs'] /* => array*/

    return (
        <div className='widget-tags'>
            <h4>Watched tags</h4>
            <div className='widget-tags-div'>
                {
                    tags.map((tag) => ( /* every single element from above array is now called as tag*/
                        <p key={tag}>{tag}</p> /* return the tags & map function needs a key so we are giving a key to p tag  */
                    ))
                }

            </div>
        </div>
    
    )
}

export default WidgetTags