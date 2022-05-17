import type { NextPage } from "next";

import { Typography } from "@mui/material";

import { ShopLayout } from "../../components/layouts";


const SpringPage:NextPage = () => {
  return (
    <ShopLayout title={'XILAMAVA | SHOP'} pageDescription={'Encuentra los mejores productos de indumentaria femenina aqui'}>
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>
      
    </ShopLayout>
  )
}

export default SpringPage