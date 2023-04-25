import { AppBar, Container, Toolbar, Typography, Stack, Button} from "@mui/material"
import LoginIcon from '@mui/icons-material/Login';

const pages=["Home","About"];

const Navbar =()=>{

    return(
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar>
                    <Typography sx={{flexGrow:1}}>
                        LOGO
                    </Typography>
                    <Stack direction={"row"} spacing={2}>
                        {pages.map((page)=>{
                            return <Button key={page} color="inherit" href={page!=="Home" ? `/${page.toLowerCase()}`:"/"}>{page}</Button>
                        })}
                        <Button variant="contained" endIcon={<LoginIcon />}>Sign In</Button>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Navbar