import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
import { gql, useMutation, useQuery } from '@apollo/client';
import GET_NEW_PRODUCTS from '../ProductComponent/sample.graphql';

const CreateCustomerAccount = () => {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [subscribe, setSubscribe] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    const [items, setItems] = useState([]);

    const handleChange = (e) => {
        if (e.target.id === 'firstname') {
            setFirstname(e.target.value);
        }
        if (e.target.id === 'lastname') {
            setLastname(e.target.value);
        }
        if (e.target.id === 'email') {
            setEmail(e.target.value);
        }
        if (e.target.id === 'password') {
            setPassword(e.target.value);
        }
        if (e.target.id === 'subscribe') {
            setSubscribe(e.target.checked);
        }
    }

    const ADD_TODO = gql`
  mutation createCustomer($firstname: String!, $lastname: String!, $email: String!, $password: String!, $is_subscribed: Boolean!) {
    createCustomer(
    input: {
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      is_subscribed: $is_subscribed
    }
  ) {
    customer {
      firstname
      lastname
      email
      is_subscribed
    }
  }
  }
`;

    console.log('b4 mutation');
    const [addUser, { data }] = useMutation(ADD_TODO);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addUser({ variables: { firstname, lastname, email, password, is_subscribed: subscribe } });
            console.log('data form submit', data);
            alert('User created successfully');
        }catch (e){
            alert(e);
            console.log('error from gql ', e);
        }
    }

    const inputBox = {
        display: "block",
        marginLeft: "37rem",
        marginTop: "1rem",
        marginBottom: "1rem"
    }
    const topDivStyle = {
        textAlign: "center",
        margin: "3rem"
    };
    const btnStyle = {
        marginTop: "1rem",
        padding: "5px",
        border: "1px dotted #000"
    };

    return(
            <div>
                <Link to="/getProductBySku">Click here to Get Product by Sku</Link>
                <div style={topDivStyle}>
                    <form onSubmit={handleSubmit}>
                        <label>firstname</label><input style={topDivStyle} style={inputBox} onChange={handleChange} id="firstname" type="text"/>
                        <label>lastname</label><input style={inputBox} onChange={handleChange} id="lastname" type="text"/>
                        <label>email</label><input style={inputBox} onChange={handleChange} id="email" type="text"/>
                        <label>password</label><input style={inputBox} onChange={handleChange} id="password" type="text"/>
                        <div>
                            <label htmlFor="subscribe"> Subrcibe</label>
                            <input onChange={handleChange} type="checkbox" id="subscribe" name="subscribe"/>
                        </div>
                        <button style={btnStyle}>Submit</button>
                    </form>
                </div>
            </div>
    );
}

export default CreateCustomerAccount;
