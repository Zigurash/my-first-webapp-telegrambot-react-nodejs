import React, {useState, useEffect} from "react";      
import './ProductList.css';
import ProductItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useEffect } from 'react';


const products = [
    {id: '1', title: 'Джинсы', price: 4890, description: 'Лён, синие рваный стиль'},
    {id: '2', title: 'Ботинки', price: 14890, description: 'Хард, тяги бархатные'},
    {id: '3', title: 'Куртка', price: 4390, description: 'Джинса, синяя рваная'},
    {id: '4', title: 'Тапки', price: 5290, description: 'Домашние, обычные'},
    {id: '5', title: 'Трусы', price: 1190, description: 'Лён, кайфовые'},
    {id: '6', title: 'Носки', price: 890, description: 'Лён, стиль'},
    {id: '7', title: 'Хзвообщечтоэто', price: 15990, description: 'Лён, полурак'},
    {id: '8', title: 'Хзвообщечтоэто', price: 15990, description: 'Лён, полурак'},
]


const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    }, 0)
} 

const ProductList= () => {
    const [addedItems, setAddedItems] = useState ([]);
    const {tg, querryId} = useTelegram();

    const onSendData = useCallback( () => {
            const data = {
                products: addedItems,
                totalPrice: getTotalPrice(addedItems),
                querryId,
            }

            fetch ('http://localhost:8000', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
        }, [])
    
        useEffect ( () => {
            tg.onEvent('mainButtonClicked', onSendData)
            return () => {
                 tg.offEvent('mainButtonClicked', onSendData)
            }
        }, [onSendData])

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id);
        let newItems =[];

        if (alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems)

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams( {
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }
    return (
    <div className={'list'}>
        {products.map(item => (
            <ProductItem
                key={item.id}
                product={item}
                onAdd={onAdd}
                className={'item'}
            />
        ))}
        </div>

    );
}

export default ProductList;