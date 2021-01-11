import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import GET_NEW_PRODUCTS from './sample.graphql';
import { arrayOf } from 'prop-types';
import GetProd from './getProd';

const GetProductBySKu = () => {

    const [sku, setSku] = useState('');
    const [formSubmitted, setFormSubmitted] = useState('');
    const [items, setItems] = useState([]);

    const topDivStyle = {
        textAlign: "center",
        margin: "3rem"
    };

    const handleChange = (e) => {
        setSku(e.target.value);
    }

    const skus = [sku];
    const { loading, error, data } = useQuery(GET_NEW_PRODUCTS, {
        variables: { skus, pageSize: 5 }
    });

    useEffect(() => {
        console.log('formSubmitteddddddd ', formSubmitted);
        console.log('dataata ', data.products.items);

            if (loading) return null;

            if (error) {
                return null;
            }

            if(data.products.items.length === 0) {
                console.log('no items returnnedddd!!!!! ');
            }

            // console.log('loading ', loading);
            // console.log('error ', error);
            console.log('data form submit', data.products.items);
            setItems(data.products.items);

    }, [formSubmitted]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(sku);
        setFormSubmitted(sku);
    }

    return(
        <div style={topDivStyle}>
            <form onSubmit={handleSubmit}>
                <label>Sku</label><input onChange={handleChange} if="skuValue" type="text"/>
                <button>Submit</button>
            </form>
            <GetProd items = {items}/>
        </div>
    );
}

export default GetProductBySKu;
