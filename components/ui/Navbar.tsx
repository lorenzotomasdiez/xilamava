import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material"
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from "@mui/material"
import NextLink from 'next/link'
import { useContext } from "react";
import { UiContext } from "../../context";


export const Navbar = () => {
  const {toggleSideMenu} = useContext(UiContext);
  return (
    <AppBar>
        <Toolbar>
            <NextLink href='/' passHref>
                <Link>
                    <Typography variant='h6'>XILAMAVA</Typography>
                    <Typography sx={{m1:0.5}}>Shop</Typography>
                </Link>
            </NextLink>
            
            <Box flex={1}/>

            <Box
                sx={{display: 'block'}}
                className="fadeIn"
            >
                <NextLink href="/category/spring" passHref>
                    <Link>
                        <Button color="info">Primavera</Button>
                    </Link>
                </NextLink>
                <NextLink href="/category/summer" passHref>
                    <Link>
                        <Button color="info">Verano</Button>
                    </Link>
                </NextLink>
                <NextLink href="/category/autumn" passHref>
                    <Link>
                        <Button color="info">Otoño</Button>
                    </Link>
                </NextLink>
                <NextLink href="/category/winter" passHref>
                    <Link>
                        <Button color="info">Invierno</Button>
                    </Link>
                </NextLink>
            </Box>

            <Box flex={ 1 } />

            {/* Pantallas pequeñas */}
            <IconButton
                /* sx={{ display: { xs: 'flex', sm: 'none' } }} */
                sx={{display:'flex'}}
                >
                <SearchOutlined />
            </IconButton>

            <NextLink href="/cart" passHref>
                <Link>
                    <IconButton>
                        <Badge badgeContent={1} color="secondary">
                            <ShoppingCartOutlined />
                        </Badge>
                    </IconButton>
                </Link>
            </NextLink>

            <Button onClick={toggleSideMenu}>
                Menu
            </Button>

        </Toolbar>
    </AppBar>
  )
}
