/**
 * This component captures a new link 
 * Capture link input should be an object that contains the (1) title of the link and (2) URL of the link
 * Incorporate LocalStorage to persist the links 
 *      The localStorage object allows you to save key/value pairs in the browser.
 *      The localStorage object stores data with no expiration date.
 *      The data is not deleted when the browser is closed, and are available for future sessions.
 */

import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ListLink from './ListLink';
import isURL from 'validator/lib/isURL';

export default function AddLink() {
    // initial state
    const [link, setLink] = useState( 
        JSON.parse(localStorage.getItem('links')) || 
        [{ name: 'Google', url: 'https://www.google.com'}] 
    );

    // new state to "add" links to initial state
    const [newLinks, setNewLinks] = useState('');

    // what happens when form is updated
    const updateData = (e) => {
        setNewLinks({
            ...newLinks,
            [e.target.name]: e.target.value
        });
    }

    // URL link validation
    const [val, setVal] = useState('');
    const [err, setErr] = useState('');
    
    const validate = (e) => {
        setVal(e.target.value);
        if (isURL(val)) {
            setErr('Valid URL');
        } else {
            setErr('Invalid URL');
        }
    };

    // what happens after form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`New link has been added!`);
        const array = [...link, newLinks];
        setLink(array);
        console.log(array);
    }

    // persist inputted data after refresh; (!) MUST be placed before the 2nd useEffect, where you update key-value pairs
    useEffect(() => {
        const data = localStorage.getItem('links');
        if ( data != null ) setLink(JSON.parse(data))
      }, []);    
    
    // update key-value pair after each link array update
    useEffect(() => {
        localStorage.setItem('links', JSON.stringify(link));
    }, [link])

    return(
        <div className="addlink">
            <>
            <form onSubmit={handleSubmit}>
                <h4>Add a new link here!</h4>
                <label>Link Name: </label>
                <input 
                    type="text"
                    name="name"
                    placeholder="Add new link name here"
                    onChange={updateData}
                /> <br />
                <label>Link URL: </label>
                <input 
                    type="text"
                    name="url"
                    placeholder="Add new link URL here"
                    onChange={updateData}
                    onInput={validate}
                /> 
                <p className="error-text">{err}</p>
                <Button type="submit">Submit</Button>
            </form>
            </> <hr />            
            <ListLink 
                link={link}
            /> 
        </div>
    )

}