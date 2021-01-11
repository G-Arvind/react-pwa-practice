import React from 'react';
import { arrayOf } from 'prop-types';

const GetProd = (props) => {

    const imgStyle = {
        height: "100px"
    };

    const detailsDivStyle = {
        margin: "3em"
    };

    const itemStyle = {
        margin: "2em"
    };

    const items = props.items;

    if(items.length === 0){
        return (
            <div>Sku cannot be empty</div>
        );
    }

    console.log("propssssss ", props.items.length);

    items.map((item) => {
        //console.log('printing item ', item);
    })
    return(
            <div style={detailsDivStyle} className="details">
                <img style={imgStyle} src={items[0].small_image.url}/>
                <div style={itemStyle} className="item">
                    <strong>ID: </strong><span>{items[0].id}</span>
                </div>
                <div style={itemStyle} className="item">
                    <strong>Name: </strong><span>{items[0].name}</span>
                </div>
                <div style={itemStyle} className="item">
                    <strong>Sku: </strong><span>{items[0].sku}</span>
                </div>
                <div style={itemStyle} className="item">
                    <strong>Price: </strong><span>{items[0].price.regularPrice.amount.value}
                    {items[0].price.regularPrice.amount.currency}
                </span>
                </div>
            </div>
    );
}

export default GetProd;
