import { IProducto } from "../productos/productos.interface";

export interface ICarrito {
    _id?: string;
    total: number;
    sub_total: number;
    mensaje: string;
    descuento: {
        valor: number;
        mensaje: string;
    };
    productos: Array<IProductosCarrito>
}

export interface ICarritoConProductos {
    _id?: string;
    total: number;
    sub_total: number;
    mensaje: string;
    descuento: {
        valor: number;
        mensaje: string;
    };
    productos: Array<IProductosCarrito>
}

export interface IProductosCarrito {
    producto: IProducto;
    cantidad: number;
    total: number;
}


export const EICarrito: ICarrito = {
    _id: '',
    total: 0,
    sub_total: 0,
    mensaje: '',
    descuento: {
        valor: 0,
        mensaje: ''
    },
    productos: []
}

export const EICarritoConProductos: ICarritoConProductos = {
    _id: '',
    total: 0,
    sub_total: 0,
    mensaje: '',
    descuento: {
        valor: 0,
        mensaje: ''
    },
    productos: []
}