import { AppBar, Container, Toolbar, Typography, Button, Box } from '@mui/material';
import Link from 'next/link';
import { SignIn } from '@clerk/nextjs';

const SignInPage: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
                <Toolbar>
                    <Typography variant='h6' sx={{ flexGrow: 1 }}>
                        Flashcard SaaS
                    </Typography>
                    <Button color="inherit">
                        <Link href="/sign-in" passHref>
                            Login
                        </Link>
                    </Button>
                    <Button color="inherit">
                        <Link href="/sign-up" passHref>
                            Sign Up
                        </Link>
                    </Button>
                </Toolbar>
            </AppBar>

            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh' }} // Added to center content vertically
            >
                <Typography variant="h4">Sign In</Typography>
                <SignIn />
            </Box>
        </Container>
    );
};

export default SignInPage;
