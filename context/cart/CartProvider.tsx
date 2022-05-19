import { FC, ReactNode, useEffect, useReducer} from 'react';
import { ICartProduct } from '../../interfaces';
import { CartContext, cartReducer} from './';
import Cookie from 'js-cookie';

export interface CartState{
    isLoaded: boolean;
    cart: ICartProduct[];
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
    shippingAddress?: IShippingAddress;
}

export interface IShippingAddress{
    firstName: string;
    lastName: string;
    address: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

export interface IOrderSummary{
    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;
}


const CART_INITIAL_STATE: CartState = {
    isLoaded: false,
    cart: [],
    numberOfItems: 0,
    subTotal: 0,
    tax: 0,
    total: 0,
    shippingAddress: undefined
}

interface Props{
    children?: ReactNode
}

export const CartProvider:FC<Props> = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);
    useEffect(() =>{
        try {
            const products = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : [];
            dispatch({type:'[Cart] - Load cart from cookies | storage', payload:products});
        } catch (error) {
            dispatch({type:'[Cart] - Load cart from cookies | storage', payload:[]});
        }
    },[])

    useEffect(() => {
        if(Cookie.get('firstName') !== undefined) {
            const shippingAddress = {
                firstName: Cookie.get('firstName') || '',
                lastName: Cookie.get('lastName') || '',
                address: Cookie.get('address') || '',
                zip: Cookie.get('zip') || '',
                city: Cookie.get('city') || '',
                country: Cookie.get('country') || '',
                phone: Cookie.get('phone') || ''
            }
    
            dispatch({type:'[Cart] - Load Address form cookies',payload:shippingAddress})
        }
    }, [])

    useEffect(() => { 
      Cookie.set('cart', JSON.stringify(state.cart));
    }, [state.cart])

    useEffect(() => {
        const numberOfItems =  state.cart.reduce((prev, current) => current.quantity + prev, 0);
        const subTotal = state.cart.reduce((prev, current) => (current.quantity * current.price) + prev, 0);
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);
        const orderSummary:IOrderSummary = {
            numberOfItems,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (1 + taxRate)
        }
        dispatch({type:'[Cart] - Update Order Summary', payload: orderSummary})
    }, [state.cart])

    
    const addProductToCart = (product:ICartProduct) => {
        
        const productInCart = state.cart.some(p => p._id === product._id);
        if(!productInCart)return dispatch({type:'[Cart] - Update products in cart', payload:[...state.cart, product]});
        
        const productInCartDifferentSize = state.cart.some(p => p._id === product._id && p.size === product.size);
        if(!productInCartDifferentSize)return dispatch({type:'[Cart] - Update products in cart', payload:[...state.cart, product]});

        const updatedProducts = state.cart.map(p => {
            if(p._id !== product._id) return p;
            if(p.size !== product.size) return p;
            
            //update quantity
            p.quantity += product.quantity;
            return p;
        })
        dispatch({type:'[Cart] - Update products in cart', payload:updatedProducts as any});
    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({type:'[Cart] - Change cart quantity', payload: product})
    }

    const removeCartProduct = (product: ICartProduct) => {
        dispatch({type:'[Cart] - Remove cart product', payload: product})
    }

    const updateAddress = (data:IShippingAddress ) => {
        Cookie.set('firstName', data.firstName);
        Cookie.set('lastName', data.lastName);
        Cookie.set('address', data.address);
        Cookie.set('zip', data.zip);
        Cookie.set('city', data.city);
        Cookie.set('country', data.country);
        Cookie.set('phone', data.phone);
        dispatch({type:'[Cart] - Update Address', payload:data})
    }


    return (
        <CartContext.Provider value={{
            ...state,

            //methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
            updateAddress,
        }}>
             { children}
        </CartContext.Provider>
    )
};